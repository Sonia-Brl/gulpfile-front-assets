var { src, dest, task, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var autoprefixer = require( 'gulp-autoprefixer' );
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require( 'gulp-plumber' );
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var stylesSRC = "./sources/scss/styles.scss";
var stylesDIST = "./assets/css/";
var stylesWatch = "./sources/scss/**/*.scss";

var imgsSRC = "./sources/images/**/*";
var imgsDIST = './assets/images/';
var imgsWatch = './sources/images/**/*.*';

var scriptsSRC = "index.js";
var scriptsFOLDER = "./sources/js/";
var scriptsDIST = "./assets/js/";
var scriptsWatch = "./sources/js/**/*.js";
var scriptsFILES = [scriptsSRC];
var scriptsWatch      = './sources/js/**/*.js';

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

function scripts(callback){
    scriptsFILES.map(function(entry){
        return browserify({ entries:[scriptsFOLDER + entry] })
        .transform(babelify, {presets:['@babel/preset-env']})
        .bundle()
        .pipe(source(entry))
        .pipe(rename({ extname: '.min.js'}))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(dest(scriptsDIST))
        .pipe(browserSync.stream());  
    });
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
    watch(scriptsWatch, series(scripts, reload));
    watch(imgsWatch, series(images, reload));
}

task("css", styles);
task("js", scripts);
task("images", images);
task("watch", parallel(browser,watchFiles));

task("default", parallel(styles,images,scripts));
task("build", parallel(browser, 'default'));