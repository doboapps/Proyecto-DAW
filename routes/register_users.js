'use strict'

const express = require('express');
const register = express();
const userCtrl = require('../controllers/user');

register.use('/login',userCtrl.signIn,function(req,res){
    //req.session.identificator=req.tokenUser;
    console.log("token register-users",req.session.identificator);

    res.status(200).send({ message: 'LogIn OK' })
   });
  
register.use('/logout',function(req,res){
    req.session.identificator=0;
    res.writeHead(302, {
      'Location': '/admin/access' });
    res.end();
});
 
module.exports = register