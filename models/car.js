'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CarSchema = Schema({

    user:String,
    units:Number,
    idProudct:String,
    status:{type:String, enum:['slope','paid']},

});

module.exports=mongoose.model('Car', CarSchema);