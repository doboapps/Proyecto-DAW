'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const enumValues = require('mongoose-enumvalues');
var dateFormat = require('dateformat');
var now = new Date();

const OrderSchema = Schema({

    userEmail:String,
    name:String,
    surnames:String,
    address:String,
    specifications:String,
    city:String,
    province:String,
    zip:String,
    contry:String,
    requestedProducts:String,    
    date:{type:Date, default:Date.now()},
    Date:{type:String, default:dateFormat()},
    total:String,
    status: {
        type: String,
        enum: ['pending', 'sent','received'],
        default: 'pending'
      },
    intrucciones:String,

});

// specifics for each method below 
const enumOptions = {}; 
OrderSchema.plugin(enumValues, enumOptions);
module.exports=mongoose.model('Orden', OrderSchema);