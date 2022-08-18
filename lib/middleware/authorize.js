module.exports = async (req, res, next) => {
  try {
    if (!req.user || req.user.email !== 'admin3')
      throw new Error('You do not have access to view this page');

    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
