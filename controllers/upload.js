'use strict'
const fs = require("fs.extra");


function upImg(req,res){
    console.log(req.body.name,req.files)

    let extensionFile = req.files.picture.name.split(".").pop();
    let dateToday =new Date().getTime();
     
    if(extensionFile=="jpg" || extensionFile=="png" || extensionFile=="gif"){
        let nameFile = req.body.name+"-"+dateToday+"."+extensionFile;  
        fs.copy(req.files.picture.path,"public/images/"+nameFile) 
        res.status(200).send({message:"subido correctamente",
                            path:"images/"+nameFile});
        
    }else{
        res.status(500).send({message:"no es un archivo de imagen compatible"});  

    }
    

    
}

module.exports = {upImg}