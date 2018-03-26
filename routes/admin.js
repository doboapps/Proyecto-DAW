  'use strict'
  const express = require('express');
  const admin = express();
  const auth = require('../middlewares/authentication');
  const adminController =require('../controllers/admin');
  const UploadController =require('../controllers/upload');
  const CategoryController =require('../controllers/category');
  const ProductController =require('../controllers/product');
  const OrderController =require('../controllers/order');


  // home admin
  admin.use('/home',auth.isAuthInternal,ProductController.getProducts,OrderController.getOrdes,adminController.createHome);
  //crear categoria
  admin.use('/category/create',auth.isAuthInternal,CategoryController.getCategory,adminController.createCategory);
  //crear productos
  admin.use('/product/create',auth.isAuthInternal,CategoryController.getCategory,adminController.createProduct);
  //ver productos
  admin.use('/product/view',auth.isAuthInternal,ProductController.getProducts,adminController.createViewProduct);
  //editar producto
  admin.use('/product/edit/:productId',auth.isAuthInternal,CategoryController.getCategory,ProductController.getProducts,adminController.createEditProduct);  
  // form subir imagen
  admin.use('/upload-image',auth.isAuthInternal,adminController.createFormUpLoadImg);
  //subida de imagen
   admin.post('/upload-images',auth.isAuthInternal,UploadController.upImg);
  // logeo  
   admin.use('/access',auth.isAuthUserAdmin,adminController.createLoginAdmin);
  // Redirect to access
   admin.use('/',adminController.redirectToAccess);



module.exports = admin;