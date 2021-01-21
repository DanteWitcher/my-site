const gulp = require ('gulp');
const svgmin = require('gulp-svgmin');
const imagemin = require('gulp-imagemin');
const fontmin = require('gulp-fontmin');

function svg() {
    return gulp
    .src('./build/img/svg/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./public/img/svg/'));
}

function img() {
    return gulp
    .src('./build/img/**/*.{img,png,gif,jpg,jpeg}')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img/'));
}

function font() { 
    return gulp
    .src('./build/fonts/**.ttf')
    .pipe(fontmin())
    .pipe(gulp.dest('./public/fonts/'))
 }

const build = gulp.series(img, svg, font);

exports.svg = svg;
exports.img = img;
exports.font = font;
exports.build = build
exports.default = build;