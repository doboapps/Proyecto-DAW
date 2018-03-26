'use strict'

const express = require('express');
const register = express();
const userCtrl = require('../controllers/user');



register.use('/login',userCtrl.signIn,function(req,res){
    res.status(200).send({ login: true })
   });
   
  
register.get('/logout/:returnLink',function(req,res){
    let root="";
    if(req.params.returnLink=="admin")
    root='/admin/access';
    else
    root= "/"+req.params.returnLink;    
    
    req.session.destroy();
    res.writeHead(302, {
      'Location': root});
    res.end();
});


  // Registro de usuarios
  register.post('/register',userCtrl.signUp,userCtrl.signIn, function (req,res){

    console.log("body",req.body);

    res.send({add:true});   
 
   });


module.exports = register