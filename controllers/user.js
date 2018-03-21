'use strict'

const mongoose = require('mongoose');
const User = require('../models/users');
const service =require('../services');


//Para registro (crea un objeto con email,name  password y devuelve un estatus 200 con el token)
const signUp =(req,res)=>{
    const user = new User({
        email:req.body.email,
        name:req.body.name,
        password:req.body.password
    });

    user.save((err)=>{
        if(err)res.status(500).send({
            message:'Error al crear al usuario: controllers.user.js '+err})
        let tokenUser =service.createToken(user);
        
        return res.status(200).send({message: 'Te has registrado correctamente',token: tokenUser})
    })
}



//Usuario ya registrado
const signIn = (req, res,next) => {
    var tokenUser="";
    console.log("token user",req.session.identificator);
    console.log("email",req.body.email);

    User.findOne({email: req.body.email}).select('password').exec(function (err, user) {
        if (err) return res.status(500).send({ message: `Error1 al ingresar: ${err}` })
        if (!user) return res.status(404).send({ message: `Usuario o password incorrectos:001` })

        return user.comparePassword(user.password,req.body.password, (err, isMatch) => {
            if (err) return res.status(500).send({ message: `Error2 al ingresar: ${err}` })
            if (!isMatch) return res.status(404).send({ message: `Usuario o password incorrectos:002` })
      
            req.user = user
            tokenUser =service.createToken(user);
            req.session.identificator=tokenUser;
            req.tokenUser=tokenUser;

            next()
          });
    });
    
  }

module.exports={ signUp,signIn }