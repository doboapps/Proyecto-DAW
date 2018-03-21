'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AdminSchema = Schema({

    UserName:String,
    password:String
    
});

module.exports=mongoose.model('Admin', AdminSchema);