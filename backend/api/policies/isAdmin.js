/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function (req, res, next) {

  if (!req.session.user) {
    return res.forbidden('Pleae login.');
  }

  
  User.findOne(req.session.user.id).exec(function parseResults(err, result) {
    if (err) return res.serverError(err);
    if (!result) return res.forbidden('You are not permitted to perform this action.');
        
    if (result.admin) {
      return next();
    } else {
      return res.forbidden('You are not permitted to perform this action.');
    }
  });  
};
