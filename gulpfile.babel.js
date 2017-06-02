"use strict";
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass   = require('gulp-sass'),
      maps = require('gulp-sourcemaps');


gulp.task('concatScripts', function(){
    return gulp.src(['asset/vendor/jquery.js', 'asset/vendor/foundation.min.js', 'asset/vendor/what-input.js', 'asset/js/app.js'])
    .pipe(maps.init())
    .pipe(concat('main.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minifyScripts', ["concatScripts"], function() {
    return gulp.src("dist/js/main.js")
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest("dist/js/"));
});

gulp.task('compileSass', function(){
   return gulp.src('asset/scss/main.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/css/'))
});

gulp.task("build", ["minifyScripts", "compileSass"]);
gulp.task('default', ["build"]);

   