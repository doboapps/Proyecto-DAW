'use strict'

const mongoose = require('mongoose');
const User = require('../models/users');
const services = require("../services");
const config = require('../config');

function isAuthGeneral( req,res,next){//acceso usuario de la bbdd a la api

    if(!req.headers.authorization){
        console.log(req.headers.authorization)
        return res.status(403).send({message:"No tienes autorización"})
    }

    const token = req.headers.authorization.split(" ")[1];

    services.decodeToken(token)
        .then(response=>{
            
            req.user=response;
            next();
        })
        .catch(response=>{
            res.status(response.status).send({message: response.message});
            
        })

}

function isAuthAdmin(req,res,next){//acceso administrador a la api

    const token = req.headers.authorization.split(" ")[1];    
    var idAdminOfTheToken= services.adminUserDecodeToken(token);
    config.ADMIN_WEBSITE;

    console.log("idadmin",idAdminOfTheToken);
    User.findById(idAdminOfTheToken,(err, user)=>{
        if(err) return res.status(500).send({message:'Error al realizar la petición en autentication.js'})
        if(!user) return res.status(404).send({message:"usuario no encontrado"})
        if(user.email!=config.ADMIN_WEBSITE) return res.status(404).send({message:"Solo puede acceder el administrador del sitio"})
        

        next();
  
      })
}


function isAuthInternal(req,res,next){//acceso del usuario
    
    //console.log("authentication.js--->",req.session)
    if(req.session.identificator==undefined){
        return res.status(404).send({message:"Solo puede acceder el administrador del sitio."})
    }
    
    try {
    //const token = req.session.identificator.split(" ")[1];    
    var idAdminOfTheToken= services.adminUserDecodeToken(req.session.identificator);
        
    } catch (error) {
        return res.status(404).send({message:"Solo puede acceder el administrador del sitio. Error"})  
    }
    config.ADMIN_WEBSITE;

    //console.log("idadmin",idAdminOfTheToken);
    User.findById(idAdminOfTheToken,(err, user)=>{
        if(err) return res.status(500).send({message:'Error al realizar la petición en autentication.js'})
        if(!user) return res.status(404).send({message:"usuario no encontrado"})
        if(user.email!=config.ADMIN_WEBSITE) return res.status(404).send({message:"Solo puede acceder el administrador del sitio"})
        
        next();
  
      })
}

function isAuthUserAdmin(req,res,next){//acceso del usuario a la administración
    
    console.log("token authentication1",req.session.identificator);
  
    try {
    var idAdminOfTheToken= services.adminUserDecodeToken(req.session.identificator);     
    }catch (error) {
        req.session.identificator=0;
    }
    User.findById(idAdminOfTheToken,(err, user)=>{
        if(err  || !user || user.email!=config.ADMIN_WEBSITE )req.session.identificator=0;    
           
     console.log("token authentication2",req.session.identificator);
        next();  
    })
}



module.exports = {isAuthGeneral,isAuthAdmin,isAuthInternal,isAuthUserAdmin}; 