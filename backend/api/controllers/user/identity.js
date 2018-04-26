module.exports = {
  friendlyName: 'User identity',

  description: '',

  inputs: {},

  exits: {
  },

  fn: async function(inputs, exits) {
    sails.log.debug('user.identity', this.req.session.userId);

    var userRecord = await User.findOne({ id: this.req.session.userId });
    return exits.success(userRecord);
  },
};
