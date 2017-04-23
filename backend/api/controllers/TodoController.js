/**
 * TodoController
 *
 * @description :: Server-side logic for managing Todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function createFn(req, res) {
    var body = req.body;

    body.userId = req.session.userId;
    return Todo.create(body)
      .then(result => res.json(result))
      .catch(error => res.json(500, error));
  },
  find: function findFn(req, res) {
    return Todo.find(req.session.userId)
      .then(result => res.json(result))
      .catch(error => res.json(500, error));
  },
  findOne: function findOneFn(req, res) {
    var id = req.param('id');
    if (id === undefined) {
      return res.json(400, 'id is required');
    }

    return Todo.findOne({ id: id, userId: req.session.userId })
      .then(result => res.json(result))
      .catch(error => res.json(500, error));
  },
  update: function updateFn(req, res) {
    var id = req.param('id');
    if (id === undefined) {
      return res.json(400, 'id is required');
    }

    var userId = req.session.userId;
    var body = req.body;
    body.userId = userId;

    return Todo.update({ id: id , userId: userId }, body)
      .then(result => res.json(result))
      .catch(error => res.json(500, error));
    
  },
  delete: function deleteFn(req, res) {
    var id = req.param('id');
    if (id === undefined) {
      return res.json(400, 'id is required');
    }

    return Todo.delete({ id: id , userId: req.session.userId })
      .then(result => res.json(result))
      .catch(error => res.json(500, error));
  }
};

