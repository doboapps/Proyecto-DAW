/* Configuración de express */

'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars')//para escribir html en node
const app = express();
const api = require('./routes/ddbb');//rutas de la api
const registerUser = require('./routes/register_users');//rutas de la api
const admin = require('./routes/admin');//rutas de la api
const shop = require('./routes/shop');//rutas de la api
const language = require('./middlewares/language')
const redirect = require('./controllers/redirect')
const formdata = require('express-form-data');//subir imagenes
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const config = require('./config');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());//te convierte en json el cuerpo
app.use(express.static('public'));

app.use(cookieParser());
//var MemoryStore =session.MemoryStore;
app.use(session({
        name : 'app.sid',
        secret: "1234567890QWERTY",
        resave: true,
        store: new mongoStore({
        url:config.dbSession,
        cookie: { secure: false },
        autoReconnect:true
        }),
        saveUninitialized: true
}));


app.engine('.hbs',hbs({
  defaultLayout: 'shop',  
  extname:'.hbs'}));
  
app.set('view engine', '.hbs');
app.use(formdata.parse({ keepExtensions:true/*,uploadDir:"imagesBorrar"*/}));

app.use('/ddbb',api);
app.use('/',registerUser);
app.use('/admin',admin);
app.use('/es/',language.es,shop);
app.use('/en/',language.en,shop);

app.use('/',redirect);




module.exports = app