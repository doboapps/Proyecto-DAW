module.exports={
  port: process.env.PORT || 3000,
  SECRET_TOKEN:"mi llave sercreta",  
  //dbShop:process.env.MOGODB ||'mongodb://localhost:27017/shop',// si estoy en produccion conectate a tal si no a la de modo desarrollo
  dbShop:process.env.MONGODB_URI ||'mongodb://localhost:27017/shop',// si estoy en produccion conectate a tal si no a la de modo desarrollo 
 // dbSession:process.env.MONGODB_URI ||'mongodb://localhost:27017/authsession',



  ADMIN_WEBSITE:'admin@admin.com'
}