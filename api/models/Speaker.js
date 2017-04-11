/**
 * Speaker.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 * Populate All Relationships (default) http://localhost:1337/speaker?populate=[sessions,spokeAt]  or http://localhost:1337/speaker
 * Populate No Relationships http://localhost:1337/speaker?populate=[]
 * Populate Only sesions relationship http://localhost:1337/speaker?populate=[sessions]
 * Populate spokeAt Relationship http://localhost:1337/speaker?populate=[spokeAt]
*/

module.exports = {
  attributes: {
    spokeAt: {
      model: 'event'
    },
    sessions: {
      collection: 'session',
      via: 'sessionGivenBy'
    }
  }
};

