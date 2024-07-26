'use strict'

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const jsmin = require('gulp-jsmin');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');


exports.css = function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(postcss([autoprefixer()]))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'))
}

exports.js = function () {
    return gulp.src('./src/js/script.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/js'))
}




exports.default = function () {
    gulp.watch(['./src/scss/*.scss'], gulp.series(['css', 'js']))
}
