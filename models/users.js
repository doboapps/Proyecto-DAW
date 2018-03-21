'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = Schema({

    email:{type:String, unique:true, lowercarse:true},
    name:String,
    password:{type:String, select:false},
    signupDate:{type:Date, default:Date.now()},
    lastLogin:Date
});


//antes que se guarde en la base de datos:
UserSchema.pre('save',function(next){
// this; recibe todo el objeto json(email,name,password....)
//si el usuario no ha modificado la contraseña

    if(!this.isModified('password')){
        console.log("Password No modificado")
        return next();
    } 

    bcrypt.genSalt(10,(err,salt)=>{

        if (err){
            return next("ERROR en models/users.js"+err);
        } 
        

        bcrypt.hash(this.password,salt,null,(err,hash)=>{
            if(err){
                console.log("Error en codificacion de contraseña")
                return next(err);
            }            
            this.password = hash;       
            next();          
        });
    })
})



UserSchema.methods.comparePassword = function (truePass,candidatePassword, cb) {
    //compara las contraseñas codificadas
    bcrypt.compare(candidatePassword, truePass, (err, isMatch) => {
        
      cb(err, isMatch)
    });
  }


module.exports=mongoose.model('Users', UserSchema);