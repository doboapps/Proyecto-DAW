'use strict'
const express = require('express');
const shop = express();
const auth = require('../middlewares/authentication');
const shopController =require('../controllers/shop');
const UploadController =require('../controllers/upload');
const CategoryController =require('../controllers/category');
const ProductController =require('../controllers/product');


shop.get('/404',shopController.noFound404);
shop.get('/about',CategoryController.getCategory,ProductController.getProducts,shopController.createAboutPage);
shop.get('/contact',CategoryController.getCategory,ProductController.getProducts,shopController.createContactPage);

shop.get('/products/:categoryName',CategoryController.getCategory,ProductController.getProducts,shopController.createCategoryProduct);
shop.get('/product/:idProduct',CategoryController.getCategory,ProductController.getProducts,shopController.createViewProduct);
shop.get('/products',CategoryController.getCategory,ProductController.getProducts,shopController.createAllProducts);
shop.get('/cart',CategoryController.getCategory,ProductController.getProducts,shopController.createPageCart);
shop.get('/register',CategoryController.getCategory,ProductController.getProducts,shopController.createPageRegister);
shop.get('/payment',CategoryController.getCategory,ProductController.getProducts,shopController.createPagePayment);
shop.get('/payment-ok',CategoryController.getCategory,ProductController.getProducts,shopController.createPagePaymentOk);
shop.get('/empty-cart',CategoryController.getCategory,ProductController.getProducts,shopController.emptyCart);
shop.get('/add-to-cart/:idProduct',CategoryController.getCategory,ProductController.getProducts,shopController.addToCart);
shop.get('/remove-from-cart/:idProduct',CategoryController.getCategory,ProductController.getProducts,shopController.removeProductCart);
shop.get('/delete-product-cart-complete/:idProduct',CategoryController.getCategory,ProductController.getProducts,shopController.deleteProductComplete);


shop.get('/',CategoryController.getCategory,ProductController.getProducts,shopController.createHome);
 


module.exports = shop;