module.exports = {
  friendlyName: 'Delete',

  description: 'Delete todo.',

  inputs: {
    id: {
      required: true,
      type: 'number',
    },
  },

  exits: {},

  fn: async function(inputs, exits) {
    sails.log.debug('todo.delete', inputs.id);
    await Todo.destroy({
      id: inputs.id,
      owner: this.req.session.userId,
    });
    return exits.success();
  },
};
