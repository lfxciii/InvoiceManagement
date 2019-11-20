'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "todo-secret-key",

  GOOGLE_ID: '1047282309576-uu5ldf172pkcg3qljfdc5srlumikm3tt.apps.googleusercontent.com',
  GOOGLE_SECRET: '19a6lwToz0OJZ8gi1P0KHfjK',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
