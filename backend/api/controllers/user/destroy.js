module.exports = {
  friendlyName: 'Delete',

  description: 'Delete user.',

  inputs: {
    id: {
      required: true,
      type: 'number',
    },
  },

  exits: {
    invalid: {
      responseType: 'badRequest',
      description: 'Nice try but the account id passed in does not match your logged in account.',
    },
  },

  fn: async function(inputs, exits) {
    sails.log.debug('user.delete (id, userId)', inputs.id, this.req.session.userId);
    await sails.helpers.validateId(inputs.id, this.req).intercept('invalid', 'invalid');

    await User.destroy({ id: this.req.session.userId });

    this.req.session.userId = null;
    return exits.success();
  },
};
