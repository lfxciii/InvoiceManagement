

'use strict';

var _ = require('lodash');
var TodoItem = require('./todoitem.model');
var User = require('../user/user.model');

// Get list of things admin
exports.index = function (req, res) {
  // if admin role, load all
  if (req.user.role === "admin") {
    // get all users
    User.find({}, '-salt -hashedPassword', function (err, userList) {
      if (err) return res.status(500).send(err);
      let users = userList;

      TodoItem.find({})
        .exec(function (err, itemList) {
          if (err) { return handleError(res, err); }
          let items = itemList;
          return res.status(200).json({ users: users, items: items })
        });
    });
  }
  else {
    // load only user items
    TodoItem.find({ userId: req.user._id }, function (err, items) {
      if (err) { return handleError(res, err); }
      if (!items) { return res.status(404).send('Not Found'); }
      return res.status(200).json({ users: [req.user], items: items })
    });
  }
};

// Creates a new thing in the DB.
exports.create = function (req, res) {

  let item = req.body;
  item.userId = req.user._id;
  item.created = new Date().toLocaleString();

  TodoItem.create(item, function (err, item) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(item);
  });
};

// Deletes a thing from the DB.
exports.delete = function (req, res) {
  TodoItem.findById(req.params.id, function (err, item) {
    if (err) { return handleError(res, err); }
    if (!item) { return res.status(404).send('Not Found'); }
    item.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).send('No Content');
    });
  });
};

// // Updates an existing thing in the DB.
// exports.update = function (req, res) {
//   TodoItem.findById(req.body._id, function (err, item) {
//     if (err) { return handleError(res, err); }
//     if (!item) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(item, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(item);
//     });
//   });
// };


// // Get a single thing per user
// exports.show = function (req, res) {
//   TodoItem.findById(req.params.id, function (err, item) {
//     if (err) { return handleError(res, err); }
//     if (!item) { return res.status(404).send('Not Found'); }
//     return res.json(item);
//   });
// };

function handleError(res, err) {
  return res.status(500).send(err);
}