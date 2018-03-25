'use strict'

const mongoose = require('mongoose');
const User = require('../models/users');
const service =require('../services');


//Para registro (crea un objeto con email,name  password y devuelve un estatus 200 con el token)
const signUp =(req,res,next)=>{

    console.log("body",req.body)

    const user = new User({
        email:req.body.emailreg,
        name:req.body.namereg,
        password:req.body.passwordreg
    });
    
    user.save((err)=>{
        if(err){
            res.status(500).send({
            message:'Error to creat user: controllers.user.js '+err})
        }else{

        //solo se puede acceder desde nuestra tienda
        if(!req.session.initSession)
        res.status(500).send({message:'Error of intrusion'})

        let tokenUser =service.createToken(user);
        req.body['email']=req.body.emailreg;
        req.body['password']=req.body.passwordreg;
        


        next();
        }
        
        
        
        //return res.status(200).send({message: 'Te has registrado correctamente',token: tokenUser})
    
    })
}



//Usuario ya registrado
const signIn = (req, res,next) => {
    var tokenUser="";
    //console.log("token user",req.session.identificator);
    //console.log("email",req.body.email);

    

    User.findOne({email: req.body.email}).select('password').select('name').select('email').exec(function (err, user) {
        if (err) return res.status(500).send({ message: `Error1 al ingresar: ${err}` })
        if (!user) return res.status(404).send({ message: `Usuario o password incorrectos:001`+user })

    
        return user.comparePassword(user.password,req.body.password, (err, isMatch) => {
            if (err) return res.status(500).send({ message: `Error2 al ingresar: ${err}` })
            if (!isMatch) return res.status(404).send({ message: `Usuario o password incorrectos:002` })

                
                req.session.dataUser = {name:user.name,email:user.email}

                tokenUser =service.createToken(user);
                req.session.identificator=tokenUser;
                req.tokenUser=tokenUser;

                next()
        });
    });
    
  }

module.exports={ signUp,signIn }