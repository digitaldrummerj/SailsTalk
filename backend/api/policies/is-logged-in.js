module.exports = function(req, res, proceed) {
  sails.log.debug('is-logged-in policy', req.session.userId);
  if (req.session.userId) {
    return proceed();
  }

  return res.unauthorized('You must be logged in');
}
