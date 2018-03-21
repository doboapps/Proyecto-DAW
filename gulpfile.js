const gulp = require('gulp'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      notify = require('gulp-notify'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      browserSync = require('browser-sync').create(),
      nodemon = require('gulp-nodemon'),
      colors =require("colors");

gulp.task('start', function () {
  nodemon({
    script: 'index.js'
  , ext: 'js'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('sass-Styles', function(){
    templateStyle('admin');
    templateStyle('shop');
})


gulp.task('watch-style', function() {
    gulp.watch('./public/css/scss/*.scss', ['sass-Styles']); // Vigila cambios en los estilos
});


gulp.task('default', ['start','sass-Styles', 'watch-style']);



function templateStyle(nameFileSass,){
    gulp.src('./public/css/scss/'+nameFileSass+'.scss')
    .pipe(sourcemaps.init())
    .pipe( sass({
        includePaths:require('node-bourbon').includePaths,
        style: 'compressed'
        })
    ).on('error', notify.onError(function(error){
        return 'Error al compilar sass.\nDetalles del error: '+error;
    }))
    .pipe(autoprefixer({browsers:['last 2 versions'],cascade: false}))
    .pipe(sourcemaps.write('./maps'+nameFileSass))
    .pipe(gulp.dest('./public/css/'))
    //.pipe(notify({title:'SASS',message:"Archivo compilado correctamente"}))
    .pipe(browserSync.stream());
    console.log(colors.bgMagenta("SASS"),colors.bgMagenta("ARCHIVO COMPILADO CORRECTAMENTE!"));
}