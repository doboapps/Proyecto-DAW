'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StockSchema = Schema({

    idProduct:String,
    s:Number,
    m:Number,
    l:Number,
    xl:Number
});

module.exports=mongoose.model('Stock', StockSchema);