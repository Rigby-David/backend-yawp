const Review = require('../models/Review');

module.exports = async (req, res, next) => {
  try {
    const review = await Review.getReviewById(req.params.id);
    if (req.user.email !== 'admin' && req.user.id !== review.user_id)
      throw new Error('Access denied');
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
