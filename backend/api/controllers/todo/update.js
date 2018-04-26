module.exports = {
  friendlyName: 'Update',

  description: 'Update todo.',

  inputs: {
    id: {
      required: true,
      type: 'number',
    },
    item: {
      type: 'string',
    },
    completed: {
      type: 'boolean',
    },
  },

  exits: {
    invalid: {
      responseType: 'badRequest',
      description: 'Nothing to process.  Either Item or Completed or both fields are required',
    },
  },

  fn: async function(inputs, exits) {
    sails.log.debug('todo.update', inputs.id);

    if (inputs.item === undefined && inputs.completed === undefined) {
      throw 'badRequest';
    }

    var fieldsToUpdate = {};

    if (inputs.item !== undefined) {
      fieldsToUpdate.item = inputs.item;
    }

    if (inputs.completed !== undefined) {
      fieldsToUpdate.completed = inputs.completed;
    }

    sails.log.debug('fieldsToUpdate', fieldsToUpdate);
    await Todo.update({
      id: inputs.id,
      owner: this.req.session.userId,
    }).set(fieldsToUpdate);

    return exits.success();
  },
};

