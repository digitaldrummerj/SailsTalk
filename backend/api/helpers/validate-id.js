module.exports = {
  friendlyName: 'Validate id',

  description: '',

  inputs: {
    id: {
      type: 'number',
      required: true,
    },
    req: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true,
    },
  },

  exits: {
    invalid: {
      responseType: 'badRequest',
      description: 'Nice try but the account id passed in does not match your logged in account.',
    },
  },

  fn: async function(inputs, exits) {
    if (inputs.id !== inputs.req.session.userId) {
      throw 'invalid';
    }

    // All done.
    return exits.success();
  },
};
