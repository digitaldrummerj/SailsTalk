module.exports = {
  friendlyName: 'Create',

  description: 'Create todo.',

  inputs: {
    item: {
      required: true,
      type: 'string',
    },
    completed: {
      type: 'boolean',
      defaultsTo: false,
    },
  },

  exits: {},

  fn: async function(inputs, exits) {
    sails.log.debug('todo.create', inputs.item, inputs.completed, this.req.session.userId, inputs);
    var createdTodo = await Todo.create(
      Object.assign({
        item: inputs.item,
        completed: inputs.completed,
        owner: this.req.session.userId
      })
    )
      .intercept(err => res.serverError(err))
      .fetch();

    return exits.success(createdTodo);
  },
};
