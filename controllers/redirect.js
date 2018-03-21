'use strict'

module.exports= function home(req,res){
    req.lang="es"
    res.writeHead(302, {
        'Location': 'es/' });
    res.end();
}