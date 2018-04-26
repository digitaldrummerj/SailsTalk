module.exports = {
  friendlyName: 'Logout',

  description: 'Logout user.',

  inputs: {},

  exits: {},

  fn: async function(inputs, exits) {
    sails.log.debug('user.logout', this.req.session.userId);
    this.req.session.userId = null;
    return exits.success();
  },
};
