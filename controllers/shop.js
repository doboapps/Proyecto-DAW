'use strict'

    function getDataLanguage(req){

         return req.categories.map((elem)=>{
                    if(req.lang=="es")
                    return {name:elem.name, _id:elem._id};
                    if(req.lang=="en")
                    return {name:elem.nameEng, _id:elem._id};
        })
    }

    function createCart(req){
        

        let listCart=[];
        for (const key in req.session.cartMarket) {
            
            req.products.map((elem)=>{
                if(elem._id.toString() == key){
                    elem.__v = req.session.cartMarket[key];
                    listCart.push(elem);
                }
            })       
        }
            
            
    return listCart;

    }

    function addToCart(req,res,next){
        req.session.cartMarket={};
        //req.session.cart="";//reset carrito

        if(req.session.cart) 
          req.session.cart+=","+req.params.idProduct;
        else 
          req.session.cart =req.params.idProduct ;          

        let cart = req.session.cart.split(",")
        let cartCount=[];

        for (let i = 0; i < cart.length; i++) {

            for (let j = 0; j < cart.length; j++) {

                if (cart[i] == cart[j]) {

                    if (typeof (cartCount[cart[i]]) == "undefined")
                        cartCount[cart[i]] = 1
                    else { cartCount[cart[i]] += 1; }
                    cart[j] = "ok";
                }
            }
        }

        let cartString=' "first": false';
        for (const key in cartCount) {//array to json for req.session
            cartString+=',"'+key+'": "'+cartCount[key]+'"';
        }
        var cartFinal =` {${cartString}}`;
        req.session.cartMarket=JSON.parse(cartFinal);
         res.send("añadido");   
    }
    

    function returnData(req,productsCategory=0,categoryName=0){
        
        let en,es;
  
        let LangCategories =getDataLanguage(req);
        console.log("lista carrito-->",createCart(req))
        if(req.lang=="es"){es=true;en=false};
        if(req.lang=="en"){es=false;en=true};
        console.log("carrito ",req.session.cartMarket)
        const data ={   layout:'shop.hbs',
                        url:req.url,
                        'en':en,
                        'es':es,
                        path:"../../",
                        lang:req.lang,
                        langWords:req.langWords,
                        markProducts:"current",
                        actualCategory:categoryName,
                        products:productsCategory,
                        cart:createCart(req),
                        categories:LangCategories}
                        
                        return data;
      
    }



    function createHome(req,res){
        //console.log("idioma",req.langWords)
        res.render('shop/index',returnData(req))
    }

    function noFound404(req,res){  
        res.render('shop/404',{layout:'shop.hbs',mark:"current"}) 
    }

    function createAllProducts(req,res){
        let data =returnData(req,req.products);
        data['markAll']='current-category';

        res.render('shop/products',data);  
    }

    function createCategoryProduct(req,res){
            const categoryName =req.params.categoryName.toLowerCase();
            
            const category= req.categories.find((categ)=>{
                return (categ.name == categoryName) || (categ.nameEng == categoryName);
            });
            
            if(typeof category != 'undefined'){
                
                var productsCategory = req.products.filter((elem)=>{ 
                    return elem.category.toString() == category._id.toString();
                });
                                
                res.render('shop/products',returnData(req,productsCategory,categoryName));             
            }else{
                res.writeHead(302, {
                'Location': '../../404' });
                res.end();
            }
    }




  function createViewProduct(req,res){    

    var product = req.products.filter((elem)=>{    

        return elem._id == req.params.idProduct;
    });    
    if(Object.keys(product).length === 0){
            res.writeHead(302, {
                'Location': '../../404' });
            res.end();

    }else{         
            res.render('shop/product',returnData(req,product));   
    }
}

module.exports = {  createHome,noFound404, 
                    createAllProducts,createCategoryProduct,
                    createViewProduct,addToCart}