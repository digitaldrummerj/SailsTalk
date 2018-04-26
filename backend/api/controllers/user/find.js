module.exports = {
  friendlyName: 'Find',

  description: 'Find user.',

  inputs: {},

  exits: {},

  fn: async function(inputs, exits) {
    sails.log.debug('user.find', this.req.session.userId);
    var users = await User.find({ id: this.req.session.userId });

    return exits.success(users);
  },
};
