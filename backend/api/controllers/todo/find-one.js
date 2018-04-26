module.exports = {
  friendlyName: 'Find one',

  description: '',

  inputs: {
    id: {
      type: 'number',
      required: true,
    },
  },

  exits: {
    idRequired: {
      responseType: 'badRequest',
      description: 'id is required',
    },
    notFound: {
      description: 'No todo with the specified ID was found.',
      responseType: 'notFound'
    }
  },

  fn: async function(inputs, exits) {
    sails.log.debug('todo find-one (id, session)', inputs.id, this.req.session.userId);
    var todoItem = await Todo.findOne({
      id: inputs.id,
      owner: this.req.session.userId,
    })
    .populate('owner')
    .intercept({ name: 'UsageError' }, 'idRequired');

    if (!todoItem) {
      sails.log.debug('todo find-one not found');
      return exits.notFound();
    }

    return exits.success(todoItem);
  },
};
