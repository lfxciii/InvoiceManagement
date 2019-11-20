'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/invoices-dev'
  },
  session: {
		cookieKey: 'hyperion!1253453425'
	},
  seedDB: false
};
