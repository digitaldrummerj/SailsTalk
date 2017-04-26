/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    email: {
      type: 'string',
      email: 'true',
      unique: 'true',
    },

    encryptedPassword: {
      type: 'string',
    },

    firstName: {
      type: 'string',
      required: false,
    },

    lastName: {
      type: 'string',
      required: false,
    },

    todos: {
      collection: 'todo',
      via: 'userId',
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      return obj;
    }
  }
};
