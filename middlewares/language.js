'use strict'

function es(req,res,next){
    req.lang ="es";
    req.langWords ={
        home:"inicio",
        about:"acerda de",
        products:"productos",
        gallery:"galería",
        contact:"contactar",
        all:"todo"
    }
    next();
}

function en(req,res,next){
    req.lang ="en";
    req.langWords ={
        home:"home",
        about:"about",
        products:"products",
        gallery:"gallery",
        contact:"contact",
        all:"all"
    }
    next();
}

module.exports = { es, en }