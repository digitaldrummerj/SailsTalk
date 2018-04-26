module.exports = {
  friendlyName: 'Update',

  description: 'Update user.',

  inputs: {
    id: {
      required: true,
      type: 'number',
    },
    email: {
      required: true,
      isEmail: true,
      type: 'string',
    },
    password: {
      required: true,
      type: 'string',
    },
  },

  exits: {
    invalid: {
      responseType: 'badRequest',
      description: 'Nice try but the account id passed in does not match your logged in account.',
    },
    emailAlreadyInUse: {
      responseType: 'alreadyInUse',
      description: 'The provided email address is already in use.',
    },
  },

  fn: async function(inputs, exits) {
    sails.log.debug('user.update', inputs.id, this.req.session.userId, inputs.email);
    await sails.helpers.validateId(inputs.id, this.req).intercept('invalid', 'invalid');

    var email = inputs.email.toLowerCase();

    let conflictingUser = await User.findOne({
      email: email,
      id: { '!=': this.req.session.userId },
    });

    if (conflictingUser) {
      throw 'emailAlreadyInUse';
    }

    // Hash the new password.
    var hashed = await sails.helpers.passwords.hashPassword(inputs.password);
    // Update the record for the logged-in user.
    await User.update({ id: this.req.session.userId }).set({
      email: email,
      password: hashed,
    });

    return exits.success();
  },
};
