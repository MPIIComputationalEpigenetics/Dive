'use strict';

var gulp = require('gulp'),
    flatten = require('gulp-flatten'),
    zip = require('gulp-zip');
    
gulp.task('build', function() {
    return gulp.src([
        '!./node_modules/**',
        '!./node_modules',
        '!./typings/**',
        '!./typings',
        '!app/**/*.js',
        '!app/**/*.map',
        '!app/**/*.d.ts',
        '!login/**/*.js',
        '!login/**/*.map',
        '!login/**/*.d.ts',
        '**'
    ]).pipe(zip('ultima.zip'))
      .pipe(gulp.dest('.'));
});