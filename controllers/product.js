'use strict'

const Product = require('../models/product').product;

//====================== GET ================================


/*   req=> peticion  / res=> respuesta     */

function getProductId(req,res){
    let productId = req.params.productId; 
    
    Product.findById(productId,(err, theProduct)=>{
        if(err) return res.status(500).send({message:'Error al realizar la petición'})
        if(!theProduct) return res.status(404).send({message:"Producto no encontrado"})
  
        res.status(200).send({product : theProduct});
  
      })
}

function getProducts(req,res,next){
    
    Product.find({},(err,products)=>{
        if(err) return res.status(500).send({message:'Error al realizar la petición'})
        if(!products) return res.status(404).send({message:"No existen productos"})
        
        req.products=products;
        next();
        //res.status(200).send(products);
    })
}


function searchCategoryInProduct(req,res,next){    
    let categoryId = req.params.categoryId; 

   Product.findOne({category:categoryId},(err,theProduct)=>{

           if(theProduct==null){
               next();
           }else{
            res.status(200).send({message:"Debe eliminar antes, los productos pertenecientes a esta categoría"});
           }
     })    
}

//====================== POST ================================

function saveProduct(req,res){
    
    console.log('POST: /api/product');
    console.log(req.body);

    let product= new Product();
    product.name = req.body.name;
    product.nameEng = req.body.nameEng;
    product.stock = req.body.stock;
    product.picture1 = req.body.picture1;
    product.picture2 = req.body.picture2;
    product.picture3 = req.body.picture3;
    product.picture4 = req.body.picture4;
    product.price = req.body.price;
    product.pricekg = req.body.pricekg;
    product.news = req.body.news;   
    product.category = req.body.category;
    product.description = req.body.description;
    product.descriptionEng = req.body.descriptionEng;
    product.weight = req.body.weight;
    

    product.save((err,productSave)=>{
        if(err){
            res.status(500).send({message:"Error al guardar el producto."+err});
        }else{
            res.status(200).send(productSave);
            console.log({message:"Registro guardado correctamente."});
        }
        

    })

}
//====================== PUT ================================

function updateProduct(req,res){

    let productId = req.params.productId; 
    let update = req.body;

    Product.findByIdAndUpdate(productId,update,(err,theProduct)=>{
        if(err) return  res.status(500).send({message:"error al actualizar el producto."+err});

        res.status(200).send({message:'Producto Actualizado'});
    }); 
}


//====================== DELETE ================================

function deleteProductId(req,res){

    let productId = req.params.productId; 

    Product.findById(productId,(err,theProduct)=>{
        if(err) return  res.status(500).send({message:"error al borrar el producto."});
    
        theProduct.remove((err)=>{
            if(err) return res.status(500).send({message:"error al borrar el producto."});
            res.status(200).send({message:"El producto ha sido eliminado"});
        })
    })

}


module.exports = {getProductId,getProducts,saveProduct,updateProduct, deleteProductId,searchCategoryInProduct}