'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  name: String,
  companyName: String,
  vatNumber: String,
  contactNumber: String,
  accountNumber: String,
  billTo: String,
  deliverTo: String,  
  email:String,
  created: String        
});

module.exports = mongoose.model('Customer', CustomerSchema);