module.exports = {
  friendlyName: 'Find one',

  description: '',

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
    sails.log.debug('user action findOne', this.req.session.userId);
    await sails.helpers.validateId(inputs.id, this.req).intercept('invalid', 'invalid');

    var id = this.req.session.userId;
    var user = await User.findOne({
      id: id,
    }).intercept(err => res.serverError(err));

    if (!user) {
      return 'notFound';
    }

    return exits.success(user);
  },
};
