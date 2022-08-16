const { Router } = require('express');
const Restaurant = require('../models/Restaurant');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const restaurants = await Restaurant.getAllRestaurants();
    // const ids = restaurants.map((restaurant) => ({
    //   id: restaurant.id,
    //   name: restaurant.name,
    //   type: restaurant.type,
    // }));
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
});
