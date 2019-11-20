

'use strict';

var _ = require('lodash');
var Invoice = require('./invoice.model');
var User = require('../invoice/invoice.model');

// Get list of things admin
exports.index = function (req, res) {
  Invoice.
    find({}).
    populate('user').
    populate('customer').
    exec(function (err, invoices) {
      if (err) return handleError(err);
      return res.status(200).json(invoices);
    });

};

// Creates a new thing in the DB.
exports.create = function (req, res) {

  let inv = req.body;
  inv.user = req.user.id;
  inv.created = new Date().toLocaleString();

  Invoice.create(inv, function (err, inv) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(inv);
  });
};

// Deletes a thing from the DB.
exports.delete = function (req, res) {
  Invoice.findById(req.params.id, function (err, item) {
    if (err) { return handleError(res, err); }
    if (!item) { return res.status(404).send('Not Found'); }
    item.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).send('No Content');
    });
  });
};

// Get a single thing per user
exports.show = function (req, res) {
  Invoice
    .findById(req.params.id)
    .populate('user')
    .populate('customer')
    .exec(function (err, invoice) {
      if (err) return handleError(err);
      return res.status(200).json(invoice);
    });
};

// // Updates an existing thing in the DB.
exports.update = function (req, res) {
  Invoice.findById(req.body._id, function (err, item) {
    if (err) { return handleError(res, err); }
    if (!item) { return res.status(404).send('Not Found'); }
    var updated = _.merge(item, req.body);
    updated.markModified('invoiceItems'); // specify objects that can be modified
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(item);
    });
  });
};




function handleError(res, err) {
  return res.status(500).send(err);
}