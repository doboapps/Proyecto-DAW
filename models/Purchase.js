'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PurchaseSchema = Schema({

    user:String,
    Date:{type:Date, default:Date.now()},
    total:String,
    status:{type:String, enum:['slope','paid']},

});

module.exports=mongoose.model('Purchase', PurchaseSchema);