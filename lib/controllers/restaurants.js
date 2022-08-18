const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAllRestaurants();
      res.json(restaurants);
    } catch (err) {
      next(err);
    }
  })
  .get('/:restId', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getRestaurantById(req.params.restId);
      await restaurants.getReviews();
      res.json(restaurants);
    } catch (err) {
      next(err);
    }
  })
  .post('/:restId/reviews', authenticate, async (req, res, next) => {
    try {
      const data = {
        ...req.body,
        user_id: req.user.id,
        restaurant_id: req.params.restId,
      };
      const newReview = await Review.insert(data);

      return res.json(newReview);
    } catch (e) {
      next(e);
    }
  });
