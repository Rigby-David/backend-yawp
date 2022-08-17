const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const adminDelete = require('../middleware/adminDelete');
const Review = require('../models/Review');

module.exports = Router().delete(
  '/:id',
  authenticate,
  adminDelete,
  async (req, res, next) => {
    try {
      const reviews = await Review.deleteReview(req.params.id);
      res.json(reviews);
    } catch (err) {
      next(err);
    }
  }
);
