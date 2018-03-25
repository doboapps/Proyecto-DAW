const Order = require('../models/order');

//====================== GET ================================

function getOrdes(req,res,next){

    OrderDate =Order.find({}).sort({date:-1});
    
    OrderDate.find({},(err,orders)=>{

        if(err) return res.status(500).send({message:'Error al realizar la petición'})
        if(!orders) return res.status(404).send({message:"No existen orden"})
        
        req.orders=orders;
        next();

    })
}
//====================== POST ================================


function saveOrder(req,res){
    
    let order= new Order();
    order.userEmail = req.body.userEmail;
    order.name = req.body.name;
    order.surnames = req.body.surnames;
    order.address = req.body.address;
    order.specifications = req.body.specifications;
    order.city = req.body.city;
    order.province = req.body.province;
    order.zip = req.body.zip;
    order.contry = req.body.contry;
    order.requestedProducts = req.body.requestedProducts;
    order.total = req.body.total;
    order.intrucciones = req.body.intrucciones;

    

    order.save((err,orderSave)=>{
        if(err){
            res.status(500).send({message:"Error al guardar al guardar registro."+err});
        }else{
            res.status(200).send(orderSave);
            console.log({message:"Registro guardado correctamente."});
        }  
    })

}

//====================== PUT ================================

function updateStatus(req,res){

    let orderId = req.params.orderId; 
    let update = req.body;
    console.log("err",update)

    Order.findByIdAndUpdate(orderId,update,(err,theOrder)=>{
        if(err){
            return  res.status(500).send({message:"error al actualizar el producto."+err});
        } 

        res.status(200).send({message:'Producto Actualizado'});
    }); 
}


module.exports = {saveOrder,getOrdes,updateStatus};