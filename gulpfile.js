var { src, dest, task, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var autoprefixer = require( 'gulp-autoprefixer' );
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require( 'gulp-plumber' );

var stylesSRC = "./sources/scss/styles.scss";
var stylesDIST = "./assets/css/";
var stylesWatch = "./sources/scss/**/*.scss";

var imgsSRC = "./sources/images/**/*";
var imgsDIST = './assets/images/';
var imgsWatch = './sources/images/**/*.*';

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

function triggerPlumber(src_file, dest_file) {
    return src( src_file )
    .pipe( plumber() )
    .pipe( dest( dest_file ) );
}

function images() {
    return triggerPlumber( imgsSRC, imgsDIST );
};



function watchFiles() {
    watch(stylesWatch, series(styles, reload));
    watch(imgsWatch, series(images, reload));
}

task("images", images);

task("css", styles);
task("watch", parallel(browser,watchFiles));

task("default", parallel(styles,images));
task("build", parallel(browser, 'default'));