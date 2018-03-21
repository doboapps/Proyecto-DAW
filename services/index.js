'use strict'

const jwtoken = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

//funcion crea tokens
function createToken(user){
    const payload = {
        idUser:user._id,
        dateTokenCreate:moment().unix(),//momento en q se crea el token
        dateTokenExpire:moment().add(15,'days').unix(),//caduca en 14 dias

    }
return jwtoken.encode(payload,config.SECRET_TOKEN);
}

function adminUserDecodeToken(token){
    const payload = jwtoken.decode(token,config.SECRET_TOKEN);
    return payload.idUser;
}


//funcion decodifica tokens
function decodeToken(token){

    //token descodificado
    const decoded = new Promise((resolve,reject)=>{

        try{
            
            const payload = jwtoken.decode(token,config.SECRET_TOKEN);
            
            if(payload.exp <= moment().unix()){
                reject({
                    status:401,
                    message:"Token expirado"  
                  }) 
            }
            resolve(payload.sub);


        }catch(err){
            reject({
              status:500,
              message:"Token invalido "+err  
            })
        }

    })

    return decoded;
}

module.exports = {createToken,decodeToken,adminUserDecodeToken};