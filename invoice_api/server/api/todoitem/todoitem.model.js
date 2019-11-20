'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoItemSchema = new Schema({
  text: String,
  userId: String,
  created: String
});

module.exports = mongoose.model('TodoItem', TodoItemSchema);