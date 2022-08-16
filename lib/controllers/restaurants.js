const { Router } = require('express');
const Restaurant = require('../models/Restaurant');

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
  });
