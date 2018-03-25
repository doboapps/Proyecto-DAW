'use strict'

const express = require('express');
const api = express.Router();
const ProductController =require('../controllers/product');
const CategoryController =require('../controllers/category');
const OrdenController =require('../controllers/order');
const auth = require('../middlewares/authentication');
//const userCtrl = require('../controllers/user');

// //------------------PRODUCT--------------------------------
// // GET 
// api.get('/product/productId',ProductController.getProductId);
// api.get('/product',ProductController.getProducts);
//  // POST 
//  api.post('/product',ProductController.saveProduct);

//  // PUT 
//  api.put('/product/:productId',ProductController.updateProduct);

//  // DELETE 
//  api.delete('/product/:productId',ProductController.deleteProductId);


//------------------CATEGORY--------------------------------
//api.get('/category-home',CategoryController.getCategory);

api.get('/category',auth.isAuthGeneral,auth.isAuthAdmin,CategoryController.getCategory);
api.post('/create-category',auth.isAuthGeneral,auth.isAuthAdmin,CategoryController.saveCategory);
api.delete('/delete-category/:categoryId',auth.isAuthGeneral,CategoryController.deleteCategoryId);
api.put('/update-category/:categoryId',auth.isAuthGeneral,auth.isAuthAdmin,CategoryController.updateCategory);

//------------------PRODUCT--------------------------------
api.get('/products',auth.isAuthGeneral,auth.isAuthAdmin,ProductController.getProducts);
api.get('/product/:productId',auth.isAuthGeneral,auth.isAuthAdmin,ProductController.getProductId);
api.post('/create-product',auth.isAuthGeneral,auth.isAuthAdmin,ProductController.saveProduct);
api.delete('/delete-product/:productId',auth.isAuthGeneral,auth.isAuthAdmin,ProductController.deleteProductId);
api.put('/edit-product/:productId',auth.isAuthGeneral,auth.isAuthAdmin,ProductController.updateProduct);

//------------------ORDERS--------------------------------
api.post('/create-order',auth.isAuthGeneral,OrdenController.saveOrder);
api.put('/update-status-order/:orderId',auth.isAuthGeneral,auth.isAuthAdmin,OrdenController.updateStatus);

 
//------------------ USERS --------------------------------
//api.post('/signup',userCtrl.signUp);
//api.post('/login',userCtrl.signIn);

//------------------ USERS --------------------------------
// api.get('/admin',auth.isAuthGeneral,auth.isAuthAdmin,function(req,res){
//     res.status(200).send({permission: true});
// });

// api.get('/permission',auth.isAuthGeneral,auth.isAuthAdmin,function(req,res){
//     res.status(200).send({permission: true});

// });

// //------------------ IMAGES --------------------------------




 module.exports = api