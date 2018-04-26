module.exports = {
  friendlyName: 'Login',

  description: 'Login user.',

  inputs: {
    email: {
      required: true,
      isEmail: true,
      type: 'string',
      description: 'email address of the user to login',
      example: 'foo@foo.com',
      extendedDescription: 'Must be a valid email address',
    },
    password: {
      required: true,
      type: 'string',
      description: 'the password to validate against',
    },
  },

  exits: {
    success: {
      description: 'The requesting user agent has been successfully logged in.',
      extendedDescription: `Under the covers, this stores the id of the logged-in user in the session
as the \`userId\` key.  The next time this user agent sends a request, assuming
it includes a cookie (like a web browser), Sails will automatically make this
user id available as req.session.userId in the corresponding action.  (Also note
that, thanks to the included "custom" hook, when a relevant request is received
from a logged-in user, that user's entire record from the database will be fetched
and exposed as \`req.me\`.)`,
    },
    invalid: {
      responseType: 'badRequest',
      description: 'The provided password and/or email address are invalid.',
      extendedDescription:
        'If this request was sent from a graphical user interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.',
    },
    badCombo: {
      description: `The provided email and password combination does not match any user in the database.`,
      responseType: 'unauthorized',
      // ^This uses the custom `unauthorized` response located in `api/responses/unauthorized.js`.
      // To customize the generic "unauthorized" response across this entire app, change that file
      // (see http://sailsjs.com/anatomy/api/responses/unauthorized-js).
      //
      // To customize the response for _only this_ action, replace `responseType` with
      // something else.  For example, you might set `statusCode: 498` and change the
      // implementation below accordingly (see http://sailsjs.com/docs/concepts/controllers).
    },
  },

  fn: async function(inputs, exits) {
    sails.log.info('login', inputs.email);

    var userRecord = await User.findOne({
      email: inputs.email.toLowerCase(),
    })
    .intercept({ name: 'UsageError' }, 'invalid');

    if (!userRecord) {
      throw 'badCombo';
    }

    await sails.helpers.passwords
      .checkPassword(inputs.password, userRecord.password)
      .intercept('incorrect', 'badCombo');

    this.req.session.userId = userRecord.id;

    return exits.success(userRecord);
  },
};
