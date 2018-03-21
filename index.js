'use strict'

const mongoose = require('mongoose');
const config = require('./config')
const app = require('./app');
const colors = require('colors');


mongoose.connect(config.dbShop,(err,ress)=>{
   if(err){
    console.log('Error al conectar a la base de datos')
   } else{
    console.log(colors.bgGreen('Conexión a la base de datos establecida correctamente :-) '));
   }
});

app.listen(config.port,()=>{
    console.log(colors.bgBlue(`Servidor para Tienda-Online corriendo en localhost://${config.port}`));
});