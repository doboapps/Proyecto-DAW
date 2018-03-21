'use strict'


function createHome (req,res){
        res.render('admin/index',{layout: 'admin.hbs',categories:req.categories})
}

function createCategory (req,res){
        res.render('admin/category/index',{ layout: 'admin.hbs',
                                            categories:req.categories,
                                            sessionToken:req.session.identificator});   
}

function createProduct (req,res){
        res.render('admin/product/create',{ layout: 'admin.hbs',
                                            categories:req.categories,
                                            sessionToken:req.session.identificator});
  }

  function createViewProduct (req,res){
        res.render('admin/product/view',{   layout: 'admin.hbs',
                                            products:req.products,
                                            sessionToken:req.session.identificator});
  } 

  function createEditProduct (req,res){

        const myProduct = req.products.find((product)=>{
            return product._id == req.params.productId    
        })
        res.render('admin/product/edit',{   layout: 'admin.hbs',
                                            sessionToken: req.session.identificator,
                                            idProduct: req.params.productId,
                                            product:myProduct,
                                            categories:req.categories});
  }


  function createFormUpLoadImg (req,res){  
        res.render('admin/upload-images',{layout: 'admin-simple.hbs'}) 
   }


   function redirectToAccess (req,res){
      res.writeHead(302, {
        'Location': '../admin/access' });
      res.end();
   }

   function createLoginAdmin (req,res){ 
    console.log("token controller-admin",req.session.identificator)
      req.session.identificator= req.session.identificator ? req.session.identificator : 0; 
      
      if(req.session.identificator==0){      
            res.render('admin/login-admin',{layout: 'admin-simple.hbs',sessionToken:req.session.identificator})
            req.session.AuthOk=true;                                        
      }else{
            req.session.AuthOk=false;
            res.writeHead(302, {
              'Location': '../admin/home' });
            res.end();
          }     
   }

module.exports = {  createHome,createCategory,
                    createProduct,createViewProduct,
                    createEditProduct,createFormUpLoadImg,
                    createLoginAdmin,redirectToAccess}