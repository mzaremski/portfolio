var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var htmlReplace = require('gulp-html-replace');
var htmlMin = require('gulp-htmlmin');
var del = require('del');
var sequence = require('run-sequence');


var handleError = function(err) {
    console.log(err);
    this.emit('end');
}


var src = {
    dist: 'dist/',
    src: 'src/',

}

var config = {
    src: src.src,
    dist: src.dist,

    cssin: src.src + 'css/**/*.css',
    jsin: src.src + 'js/**/*.js',
    imgin: src.src + 'img/**/*.{jpg,jpeg,png,gif}',
    htmlin: src.src + '*.html',
    scssin: src.src + 'scss/**/*.scss',

    cssout: src.dist + 'css/',
    jsout: src.dist + 'js/',
    imgout: src.dist + 'img/',
    htmlout: src.dist,
    scssout: src.src + 'css/',

    cssoutname: 'style.css',
    jsoutname: 'scripts.js',
    cssreplaceout: 'css/style.css',
    jsreplaceout: 'js/scripts.js',
}



gulp.task('default', ['serve'])


gulp.task("serve",['sass','saveall'], function(){
    browserSync({
        server: config.src
    })

    gulp.watch(config.htmlin, ['reload'])
    gulp.watch(config.scssin, ['sass'])
})


gulp.task('dafq', function(){
    console.log("DAFQ:  " + config.cssin)
})


gulp.task('sass', function(){
    return gulp.src(config.scssin)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.scssout))
        .pipe(browserSync.stream())
})


gulp.task('css', function() {
    return gulp.src(config.cssin)
        .pipe(concat(config.cssoutname))
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.cssout))
})


gulp.task('js', function() {
    return gulp.src(config.jsin)
        .pipe(concat(config.jsoutname))
        .pipe(uglify())
        .pipe(gulp.dest(config.jsout))
})


gulp.task('img', function() {
    var distUrl = config.imgout
    return gulp.src(config.imgin)
        .pipe(changed(distUrl))
        .pipe(imagemin())
        .pipe(gulp.dest(distUrl))
})


gulp.task('html', function() {
    return gulp.src(config.htmlin)
        .pipe(htmlReplace({
            'css': config.cssreplaceout,
            'js': config.jsreplaceout
        }))
        .pipe(htmlMin({
            sortAttributes: true,
            sortClassName: true,
            collapseWhitespace:true
        }))
        .pipe(gulp.dest(config.dist))
})


gulp.task('clean', function() {
    return del(config.dist)
})


gulp.task('build', function() {
    sequence('clean', ['html','js','css','img'])
})


gulp.task('reload', function() {
    browserSync.reload()
})


gulp.task('saveall', function() {

})
