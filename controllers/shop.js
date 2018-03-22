'use strict'

    function getDataLanguage(req){

         return req.categories.map((elem)=>{
                    if(req.lang=="es")
                    return {name:elem.name, _id:elem._id};
                    if(req.lang=="en")
                    return {name:elem.nameEng, _id:elem._id};
        })
    }


    function getPriceTotal(cart,req){
        
        let cartComplete=createCart(req);
        let priceTotal=0;

        for (const key in cart) {           
            cartComplete.map((elem)=>{
                if( elem._id ==  key )
                    priceTotal+=cart[key]*elem.price;                
            })
           }
           //console.log("pt",priceTotal)
        return priceTotal;
           
    }

    //crea el array con el contenido del carro
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


    function convertStringCartToObject(req,addProduct,deleteProductComplete){
        
        if(addProduct){
            if(req.session.cart) //añado un producto al string
            req.session.cart+=","+req.params.idProduct;
            else 
            req.session.cart =req.params.idProduct ;
        }else if(!addProduct){//elimino una del producto del string
            let newCart = req.session.cart.replace(req.params.idProduct,"removed");
            req.session.cart=newCart; 
        }
        if(deleteProductComplete){
            let regEx = new RegExp(req.params.idProduct,"g")
            let newCart = req.session.cart.replace(regEx, "removed");    
            req.session.cart=newCart;
        }
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

        return req.session.cartMarket;
     }

    
    function addToCart(req,res){
        req.session.cartMarket={};
        //req.session.cart="";//reset carrito
        let cart = convertStringCartToObject(req,true,false); 
        req.session.totalPrice=getPriceTotal(cart,req);
        res.send({add:"ok"});   
    }

    function removeProductCart(req,res){        
        let cart =convertStringCartToObject(req,false,false);
        req.session.totalPrice=getPriceTotal(cart,req);
        res.send({priceTotal:getPriceTotal(cart,req)});   
    }

    function deleteProductComplete(req,res){        
        let cart =convertStringCartToObject(req,false,true);
        req.session.totalPrice=getPriceTotal(cart,req);
        res.send({priceTotal:getPriceTotal(cart,req)});   
    }

    function emptyCart(req,res){        
        req.session.totalPrice=0;
        req.session.cart="";
        req.session.cartMarket={}
        res.send({emptyCart:"ok"});   
 
    }
    

    function returnData(req,productsCategory=0,categoryName=0){
        
        let en,es;
  
        let LangCategories =getDataLanguage(req);
        //console.log("lista carrito-->",createCart(req))
        if(req.lang=="es"){es=true;en=false};
        if(req.lang=="en"){es=false;en=true};
        //console.log("carrito ",req.session.cartMarket)
        const data ={   layout:'shop.hbs',
                        url:req.url,
                        'en':en,
                        'es':es,
                        path:"../../",
                        lang:req.lang,
                        langWords:req.langWords,
                        actualCategory:categoryName,
                        products:productsCategory,
                        cart:createCart(req),
                        totalPrice:req.session.totalPrice,
                        categories:LangCategories}
                        
                        return data;
      
    }



    function createHome(req,res){
        //console.log("idioma",req.langWords)
        let data=returnData(req);
        data['markHome']='current';
        res.render('shop/index',data)
    }

    function noFound404(req,res){  
        res.render('shop/404',{layout:'shop.hbs',mark:"current"}) 
    }

    function createAllProducts(req,res){
        let data =returnData(req,req.products);
        data['markProducts']='current';
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


function createPageCart(req,res){    

    res.render('shop/cart',returnData(req))

}

module.exports = {  createHome,noFound404,removeProductCart,
                    createAllProducts,createCategoryProduct,
                    createViewProduct,addToCart,emptyCart,
                    deleteProductComplete,createPageCart}