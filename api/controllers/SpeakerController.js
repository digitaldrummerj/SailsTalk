/**
 * SpeakerController
 *
 * @description :: Server-side logic for managing speakers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  find: function findFn(req, res) {
    return Speaker.find({})
      .then(result => {
        return res.json(200, result);
      })
      .catch(error => {
        sails.log.error('SpeakerController.find', error);
        return res.json(500, error);
      });
  },
  findWithSessions: function findWithSessionsFn(req, res) {
    return Speaker.find({})
      .populate('sessions')
      .then(result => {
        return res.json(200, result);
      })
      .catch(error => {
        sails.log.error('SpeakerController.findWithSessons', error);
        return res.json(500, error);
      });
  },
  findOne: function findOneFn(req, res) {
    var id = req.params.id;
    return Speaker.find({ id: id })
      .populate('sessions')
      .populate('spokeAt')
      .then(result => res.json(200, result))
      .catch(error => {
        sails.log.error('SpeakerController.findOne', error);
        return res.json(500, error);
      });
  },
  create: function createFn(req, res) {
    return Speaker.create(req.body)
      .then(result => res.json(200, result))
      .catch(error => {
        sails.log.error('SpeakerController.create', error);
        return res.json(500, error);
      });
  },
  update: function updateFn(req, res) {
    var id = req.params.id;
    return Speaker.update({ id: id }, req.body)
      .then(result => res.json(200, result))
      .catch(error => {
        sails.log.error('SpeakerController.update', error);
        return res.json(500, error);
      });
  },
  destroy: function destroyFn(req, res) {
    var id = req.params.id;

    return Speaker.delete({ id: id })
      .then(result => res.json(200, result))
      .catch(error => {
        sails.log.error('SpeakerController.delete', error);
        return res.json(500, error);
      });
  }
};

