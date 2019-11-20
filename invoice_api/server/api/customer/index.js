'use strict';

var express = require('express');
var controller = require('./customer.controller');
var passport = require('passport');
var auth = require('../../middelware/authenticate');

var router = express.Router();

router.get('/', (req, res, next) => {
    auth.authenticate(req, res, next); // middleware
}, controller.index);

router.post('/', (req, res, next) => {
    auth.authenticate(req, res, next); // middleware
}, controller.create);

router.delete('/:id', (req, res, next) => {
    auth.authenticate(req, res, next); // middleware
}, controller.delete);

module.exports = router;