'use strict'


const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//-------------------CATEGORIA------------------------------
const CategorySchema = Schema({

    name:String,
    nameEng:String
    
});
module.exports=mongoose.model('Category', CategorySchema);


//-------------------PRODUCTO------------------------------

const Category = mongoose.model('Category')

const ProductSchema = Schema({

    name:String,
    nameEng:String,
    stock:Number,
    picture1: String,
    picture2: String,
    picture3: String,
    picture4: String,
    price:{type:Number, default:0},
    pricekg:{type:Number, default:0},
    news: Boolean,
    category:{type: Schema.ObjectId, ref:"Category"},
    description:String,
    descriptionEng:String,
    weight: {type:Number, default:0},

});


var product = mongoose.model('Product', ProductSchema, 'product');
var category= mongoose.model('Category', CategorySchema, 'category');
module.exports={product,category}