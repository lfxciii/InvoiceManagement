'use strict';

var express = require('express');
var controller = require('./thing.controller');
var passport = require('passport');

var router = express.Router();

router.get('/', passport.authenticate('local', {scope: ['user']}), controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;