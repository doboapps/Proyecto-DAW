'use strict'

function es(req,res,next){
    req.session.lang ="es";
    req.session.langWords ={
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
    req.session.lang ="en";
    req.session.langWords ={
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