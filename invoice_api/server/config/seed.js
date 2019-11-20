/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var User = require('../api/user/user.model');
var Customer = require('../api/customer/customer.model');
var Invoice = require('../api/invoice/invoice.model');

// Insert seed data below
var userSeed = require('../api/user/user.seed.json');
var customerSeed = require('../api/customer/customer.seed.json');
var invoiceSeed = require('../api/invoice/invoice.seed.json');

User.find({}).remove(function() {
  User.create(userSeed);
});

Customer.find({}).remove(function() {
  Customer.create(customerSeed);
});

Invoice.find({}).remove(function() {
  // Invoice.create(invoiceSeed);
});