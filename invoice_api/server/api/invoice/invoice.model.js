'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InvoiceSchema = new Schema({  
  invoiceItems: [],
  nettPrice: Number,
  vat: Number,
  totalAmount: Number,  
  customer: [{ type: Schema.Types.ObjectId, ref: 'Customer' }],  
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  created: String                      
});

module.exports = mongoose.model('Invoice', InvoiceSchema);