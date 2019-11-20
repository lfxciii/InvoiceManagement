/**
 * Express configuration
 */

'use strict';

var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
// const cookieSession = require('cookie-session');
var cors = require('cors');
// import authenticate from '../middelware/authenticate';
// var authenticate = require('../middelware/authenticate');


// file: index.js
var _ = require("lodash");
// var express = require("express");
// var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

// var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

module.exports = function (app) {
  var env = app.get('env');
  app.use(cookieParser());
  // app.use(authenticate());
  // dont really need this do i?
  // app.use(cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: ['hyperion!1253453425'] }));  
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());  
  
  app.use(cors());
  if ('production' === env) {
    app.use(morgan('dev'));
  }


  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};