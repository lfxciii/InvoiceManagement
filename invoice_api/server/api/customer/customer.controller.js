

'use strict';

var _ = require('lodash');
var Customer = require('./customer.model');
var User = require('../user/user.model');

// Get list of things admin
exports.index = async function (req, res) {
  // load only customers
  // Customer.find({}, function (err, customers) {
  //   if (err) { return handleError(res, err); }
  //   customers.invoices = invoices;
  //   if (!customers) { return res.status(404).send('Not Found'); }
  //   return res.status(200).json({ customers })
  // });

  const customers = Customer.
    find({ }).
    populate('invoices').
    exec(function (err, customers) {
      if (err) return handleError(err);         
      return res.status(200).json(customers);
    });

  console.log(customers);
};

// Creates a new thing in the DB.
exports.create = function (req, res) {

  let customer = req.body;
  customer.userId = req.user.id;
  customer.created = new Date().toLocaleString();

  Customer.create(customer, function (err, customer) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(customer);
  });
};

// Deletes a thing from the DB.
exports.delete = function (req, res) {
  Customer.findById(req.params.id, function (err, item) {
    if (err) { return handleError(res, err); }
    if (!item) { return res.status(404).send('Not Found'); }
    item.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}