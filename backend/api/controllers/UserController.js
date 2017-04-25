/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Emailaddresses = require("machinepack-emailaddresses");
var Passwords = require("machinepack-passwords");

module.exports = {

  login: function (req, res) {
    User.findOne({ email: req.param('email') }
      , function foundUser(err, user) {
        if (err) return res.negotiate(err);
        if (!user) return res.notFound();

        Passwords.checkPassword({
          passwordAttempt: req.param('password'),
          encryptedPassword: user.encryptedPassword
        }).exec({
          error: function (err) {
            return res.negotiate(err);
          },

          incorrect: function () {
            return res.notFound();
          },

          success: function () {
            if (user.deleted) {
              return res.forbidden("'Your account has been deleted.'");
            }

            if (user.banned) {
              return res.forbidden("'Your account has been banned.'");
            }

            req.session.user = user;
            return res.json(200, user);
          }
        });
      });
  },

  logout: function (req, res) {

    User.findOne(req.session.user.id, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        return res.notFound('User not found');
      }

      // log the user-agent out.
      req.session.user = null;

      return res.ok();
    });
  },

  create: function (req, res) {
    if (_.isUndefined(req.param('email'))) {
      return res.badRequest('An email address is required!');
    }

    if (_.isUndefined(req.param('password'))) {
      return res.badRequest('A password is required!');
    }

    if (req.param('password').length < 6) {
      return res.badRequest('Password must be at least 6 characters!');
    }

    Emailaddresses.validate({
      string: req.param('email'),
    }).exec({
      // An unexpected error occurred.
      error: function (err) {
        return res.serverError(err);
      },
      // The provided string is not an email address.
      invalid: function () {
        return res.badRequest('Doesn\'t look like an email address to me!');
      },
      // OK.
      success: function () {
        Passwords.encryptPassword({
          password: req.param('password'),
        }).exec({

          error: function (err) {
            return res.serverError(err);
          },

          success: function (result) {
            var options = {
              email: req.param('email'),
              encryptedPassword: result,
              deleted: false,
              admin: false
            };

            User.create(options).exec(function (err, createdUser) {
              if (err) {
                sails.log.error('the error is: ', err.invalidAttributes);

                // Check for duplicate email address
                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {

                  // return res.send(409, 'Email address is already taken by another user, please try again.');
                  return res.alreadyInUse(err);
                }

                return res.negotiate(err);
              }

              // Log the user in
              req.session.user = createdUser;

              return res.json(200, createdUser);
            });
          }
        });
      }
    });
  },

  delete: function (req, res) {

    User.update({
      id: req.session.user.id
    }, {
        deleted: true
      }, function (err, removedUser) {

        if (err) return res.negotiate(err);
        if (removedUser.length === 0) {
          return res.notFound();
        }

        req.session.user = null;
        return res.ok();
      });
  },

  update: function (req, res) {
    User.update(req.session.user.id, req.body)
      .exec(function (err, user) {
        if (err) return res.negotiate(err);

        if (user.length === 0) {
          return res.notFound();
        }

        return res.json(user);
      });
  },

  findOne: function (req, res) {

    User.findOne({
      id: req.session.user.id
    })
      .populate('todos')
      .exec(function (err, user) {
        if (err) return res.negotiate(err);

        if (user.length === 0) {
          return res.notFound();
        }

        return res.json(user);
      });
  },

  userIdentity: function (req, res) {
    if (req.session.user) {
      return res.json(200, req.session.user);
    } else {
      return res.forbidden("Not Logged In");
    }
  },

  changePassword: function (req, res) {

    // Fallback to client-side required validation
    if (_.isUndefined(req.param('password'))) {
      return res.badRequest('A password is required!');
    }

    // Fallback to client-side length check validation
    if (req.param('password').length < 6) {
      return res.badRequest('Password must be at least 6 characters!');
    }

    Passwords.encryptPassword({
      password: req.param('password'),
    }).exec({
      error: function (err) {
        return res.serverError(err);
      },
      success: function (result) {

        User.update({
          // id: req.param('id')
          id: req.session.user.id
        }, {
            encryptedPassword: result
          }).exec(function (err, updatedUser) {
            if (err) {
              return res.negotiate(err);
            }
            return res.json({
              username: updatedUser[0].username
            });
          });
      }
    });
  },

  adminUsers: function (req, res) {

    User.find().exec(function (err, users) {

      if (err) return res.negotiate(err);

      if (users.length === 0) return res.notFound();

      var updatedUsers = _.map(users, function (user) {
        user = {
          id: user.id,
          email: user.email,
          admin: user.admin,
          deleted: user.deleted,
        };

        return user;
      });

      return res.json(updatedUsers);
    });
  },

  adminUpdate: function (req, res) {

    User.update(req.param('id'), {
      admin: req.param('admin')
    }).exec(function (err, update) {

      if (err) return res.negotiate(err);

      return res.ok();
    });
  },

  adminUpdateDeleted: function (req, res) {
    User.update(req.param('id'), {
      deleted: req.param('deleted')
    }).exec(function (err, update) {
      if (err) return res.negotiate(err);
      return res.ok();
    });
  },

};
