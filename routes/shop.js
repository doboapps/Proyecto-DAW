'use strict'
const express = require('express');
const shop = express();
const auth = require('../middlewares/authentication');
const shopController =require('../controllers/shop');
const UploadController =require('../controllers/upload');
const CategoryController =require('../controllers/category');
const ProductController =require('../controllers/product');


shop.get('/404',shopController.noFound404);
shop.get('/products/:categoryName',CategoryController.getCategory,ProductController.getProducts,shopController.createCategoryProduct);
shop.get('/product/:idProduct',CategoryController.getCategory,ProductController.getProducts,shopController.createViewProduct);
shop.get('/products',CategoryController.getCategory,ProductController.getProducts,shopController.createAllProducts);
shop.get('/add-to-cart/:idProduct',CategoryController.getCategory,ProductController.getProducts,shopController.addToCart);
shop.get('/',CategoryController.getCategory,ProductController.getProducts,shopController.createHome);
 


module.exports = shop;