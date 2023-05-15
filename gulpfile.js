var { src, dest, task, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var autoprefixer = require( 'gulp-autoprefixer' );
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

var stylesSRC = "./sources/scss/styles.scss";
var stylesDIST = "./assets/css/";
var stylesWatch = "./sources/scss/**/*.scss";


function browser(){
    browserSync.init({
        server:{
            baseDir:"./"
        }
    });
}

function reload(callback){
    browserSync.reload();
    callback();
}


function styles(callback){
    src(stylesSRC)
    .pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole:true,outputStyle:'compressed'}).on("error", console.error.bind(console)))
    .pipe(autoprefixer({browders:['last 2 versions', '> 5%', 'Firefox ESR']}))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(stylesDIST))
    .pipe(browserSync.stream());
    callback();
}; 


function watchFiles() {
    watch(stylesWatch, series(styles, reload));
}

task("css", styles);
task("watch", parallel(browser,watchFiles));

task("default", parallel(styles));
task("build", parallel(browser, 'default'));