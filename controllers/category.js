'use strict'

const Category = require('../models/product').category;
const Product = require('../models/product').product;

//====================== GET ================================
function getCategoryId(req,res){
    let categoryId = req.params.categoryId; 
    
    Category.findById(categoryId,(err, theCategory)=>{
        if(err) return res.status(500).send({message:'Error al realizar la petición'})
        if(!theCategory) return res.status(404).send({message:"Producto no encontrado"})
  
        res.status(200).send({category : theCategory});
  
      })
}

function getCategory(req,res,next){
    
    Category.find({},(err,Categories)=>{
        if(err) return res.status(500).send({message:'Error al realizar la petición'})
        if(!Categories) return res.status(404).send({message:"No existen categoría"})

        req.categories=Categories;
        //res.status(200).send(Categories);
        next();
    })
}

//====================== POST ================================


function saveCategory(req,res){
    

    let category= new Category();
    

    Category.findOne({name:req.body.name},(err,Categories)=>{
        console.log(Categories);
        if(err) return res.status(500).send({message:'Error al realizar la petición'})
        if(!Categories){

            category.name = req.body.name.toLowerCase();
            category.nameEng = req.body.nameEng.toLowerCase();    

            category.save((err,CategorySave)=>{
                if(err){
                    res.status(500).send("Error al guardar la category.");
                }else{
                    res.status(200).send({message:"Categoía creada correctamente."});
                    console.log("Categoría guardada correctamente.");
                }                
            })                        
        }else{
            res.status(404).send({message:"Ya existe esta categoría"});
        }

    }) 

}
//====================== PUT ================================

function updateCategory(req,res){

    let categoryId = req.params.categoryId; 
    let update = req.body;
    console.log(categoryId,update)

    Category.findByIdAndUpdate(categoryId,update,(err,theCategory)=>{
        if(err) return  res.status(500).send({message:"error al actualizar la categoria: "+err});

        res.status(200).send({message:'Categoria Actualizada'});
    }); 
}


//====================== DELETE ================================






function deleteCategoryId(req,res){
  
    let categoryId = req.params.categoryId; 
    
        Category.findById(categoryId,(err,theCategory)=>{
            if(err) return  res.status(500).send({message:"error1 al borrar la  categoría."+err});
        
            theCategory.remove((err)=>{
                if(err) return res.status(500).send({message:"error2 al borrar la  categoría."+err});
                res.status(200).send({message:"La categoría ha sido eliminada"});
            })
        })
}


module.exports = {  getCategoryId,
                    getCategory,
                    saveCategory,
                    updateCategory,
                    deleteCategoryId}