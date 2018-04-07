'use strict'

function es(req,res,next){
    req.session.lang ="es";
    req.session.langWords ={
        //menu
        home:"inicio",
        about:"acerda de",
        products:"productos",
        contact:"contactar",
        register:"registrarse",
        all:"todo",
        //about
        titleAbout:"Quienes Somos",
        paragraph1:"“Trae la Chacina” diría mi abuelo o mi padre cuando acaban el segundo plato.",
        paragraph2:"De dónde yo provengo (un pequeño pueblo en la sierra de Aracena)  la Chacina es la guinda del pastel, es el trocito de queso de oveja que hizo la vecina y que acompañas con un par de piquitos, es el par de rodajas de lomo o de presa que ponen el punto final en el paladar antes del postre, cada día un poquito, como si fuera oro. Es simplemente acabar la comida con un gusto a lo nuestro.",
        paragraph3:"De este rincón que nunca se sabe bien si estás en Huelva o en Extremadura sale la Chacina buena, de esa que proviene de los que comen bellotas bajo los alcornoques y los olivos, de esa que secan en el garaje nuestras abuelas nuestros tíos o los vecinos  hasta que esta bien curada,de esa que te llevas a la boca y te sabe a Gloria.",
        paragraph4:"Nuestra intención es compartir ese placer, en forma de queso de oveja, de presa ibérica, de jamón Ibérico de bellota o de oro líquido como es nuestro aceite de oliva Virgen extra.",
        paragraph5:"La cultura de traer a la mesa la Chacina, un arte que se sirve en bandejas de madera de alcornoque y que se convierte en un ritual para los lugareños de estos lares.",
        paragraph6:"Nuestro proyecto llevar la Chacina a todo el que desee impregnarse de este ritual y disfrutar del placer del buen embutido.",
        //contact
        //login
        send:"Enviar",
        //register
        name:"Nombre",
        repeat:"Repetir",
        registerOk:"Ha sido registrado y Logeado Correctamente!",
        //cart auxiliar
        cart:"Carrito",
        see:"ver",
        emptyCart:"Vaciar carro",
        //product
        addCart:"Añadir aL carro",
        productAdd:"Producto Añadido",
        addOk:"Añadido correctamente!",
        //cart
        priceU:"Precio unidad",
        login_buy:"logear y comprar",
        tobuy:"Comprar",
        //payment
        surnames:"Apellidos",
        address:"Dirección",
        addressSpecifications:"Especificaciones de Dirección:",
        city:"Localidad",
        state:"Provincia",
        zip:"Código Postal",
        country:"País",
        paymentInformation:"Datos de Pago",
        numberCard:"Nº de tarjeta",
        expiration:"Caducidad",
        resume:"Resumen",
        instructions:"Notas o Intrucciones (Opcional)",
        purchaseOk:"Compra Realizada",
        prucahseSuccessfully:"Compra realizada satisfactoriamente!"
    }
    next();
}

function en(req,res,next){
    req.session.lang ="en";
    req.session.langWords ={
        //menu
        home:"home",
        about:"about",
        products:"products",
        contact:"contact",
        register:"register",
        all:"all",
        //about
        titleAbout:"Who Are",
        paragraph1:"“Trae la Chacina” diría mi abuelo o mi padre cuando acaban el segundo plato.",
        paragraph2:"De dónde yo provengo (un pequeño pueblo en la sierra de Aracena)  la Chacina es la guinda del pastel, es el trocito de queso de oveja que hizo la vecina y que acompañas con un par de piquitos, es el par de rodajas de lomo o de presa que ponen el punto final en el paladar antes del postre, cada día un poquito, como si fuera oro. Es simplemente acabar la comida con un gusto a lo nuestro.",
        paragraph3:"De este rincón que nunca se sabe bien si estás en Huelva o en Extremadura sale la Chacina buena, de esa que proviene de los que comen bellotas bajo los alcornoques y los olivos, de esa que secan en el garaje nuestras abuelas nuestros tíos o los vecinos  hasta que esta bien curada,de esa que te llevas a la boca y te sabe a Gloria.",
        paragraph4:"Nuestra intención es compartir ese placer, en forma de queso de oveja, de presa ibérica, de jamón Ibérico de bellota o de oro líquido como es nuestro aceite de oliva Virgen extra.",
        paragraph5:"La cultura de traer a la mesa la Chacina, un arte que se sirve en bandejas de madera de alcornoque y que se convierte en un ritual para los lugareños de estos lares.",
        paragraph6:"Nuestro proyecto llevar la Chacina a todo el que desee impregnarse de este ritual y disfrutar del placer del buen embutido.",
        //contact
        //login
        send:"Send",
        //register
        name:"name",
        repeat:"Repeat",
        registerOk:"You have been registered and successfully loged!",
        //cart auxiliar
        cart:"Cart",
        see:"see",
        emptyCart:"Empty cart",
        //product
        addCart:"Add to cart",
        productAdd:"Product Added",
        addOk:"Added correctly!",
        //cart
        priceU:"Unit price",
        login_buy:"login and buy",
        tobuy:"buy",
        //payment
        surnames:"Surnames",
        address:"Address",
        addressSpecifications:"Address Specifications",
        city:"City",
        state:"State",
        zip:"Zip",
        country:"Country",
        paymentInformation:"Payment Information",
        numberCard:"Number Card",
        expiration:"Expiration",
        resume:"Resume",
        instructions:"Instructions (Optional)",
        purchaseOk:"Purchase Ok",
        prucahseSuccessfully:"Prucahse made successfully!"
    }
    next();
}

module.exports = { es, en }



