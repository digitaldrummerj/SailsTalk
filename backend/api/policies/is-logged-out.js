module.exports = function(req, res, proceed) {
  sails.log.debug('is-logged-out policy', req.session.userId);

  if (!req.session.userId) {
    return proceed();
  }

  return res.unauthorized('You must be logged out');
}
