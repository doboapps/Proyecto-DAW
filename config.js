module.exports={
  port: process.env.PORT || 3000,
  SECRET_TOKEN:"mi llave sercreta",  
  dbShop:process.env.MONGODB_URI ||'mongodb://localhost:27017/shop',// si estoy en produccion conectate a tal si no a la de modo desarrollo 
  dbSession:process.env.MONGODB_URI ||'mongodb://localhost:27017/authsession',
  // dbShop:'mongodb://admin:12345@ds121889.mlab.com:21889/heroku_cx5mnk2k',
  // dbSession:'mongodb://admin:12345@ds121889.mlab.com:21889/heroku_cx5mnk2k',

  ADMIN_WEBSITE:'admin@admin.com'
}