module.exports = {
  friendlyName: 'Find',

  description: 'Find todo.',

  inputs: {},

  exits: {},

  fn: async function(inputs, exits) {
    sails.log.debug('todo.find');
    var todoItems = await Todo.find({
      id: inputs.id,
      owner: this.req.session.userId,
    })
    .populate('owner');
    return exits.success(todoItems);
  },
};
