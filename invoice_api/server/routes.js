/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  // Insert routes below  
  app.use('/api/invoices', require('./api/invoice'));
  app.use('/api/customers', require('./api/customer'));
  app.use('/api/users', require('./api/user'));  

  app.use('/auth', require('./auth'));
  

};
