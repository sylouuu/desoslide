/*jslint browser: true, devel: true, plusplus: true, unparam: true, vars: true, white: true*/
/*global require*/

(function() {

    'use strict';

    // Gulp
    // ----------------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------------
    var gulp = require('gulp');

    // Importing Gulp dependencies
    // ------------------------------------------------------------------------------------------------------
    var
        uglify      = require('gulp-uglify'),
        less        = require('gulp-less'),
        minifyCSS   = require('gulp-minify-css'),
        rename      = require('gulp-rename'),
        jshint      = require('gulp-jshint'),
        notify      = require('gulp-notify'),
        qunit       = require('gulp-qunit');


    // Source path
    // ------------------------------------------------------------------------------------------------------
    var dist_path   = 'dist/';
    var doc_path    = 'doc/assets/';

    // Tasks configuration
    // ------------------------------------------------------------------------------------------------------
    var tasks = {
        'dist_js': {
            source: dist_path +'js/jquery.desoslide.js',
            dest:   dist_path +'js'
        },
        'dist_less': {
            source: dist_path +'less/jquery.desoslide.less',
            dest:   dist_path +'css'
        },
        'doc_less_main': {
            source: doc_path +'less/app/main.less',
            dest:   doc_path +'css/app'
        },
        'doc_less_views': {
            source: doc_path +'less/app/views/**/*.less',
            dest:   doc_path +'css/app/views'
        }
    };

    // Javascript
    // ------------------------------------------------------------------------------------------------------
    gulp.task('dist_js_min', function() {

        return gulp
            .src(tasks.dist_js.source)
            .pipe(uglify({
                preserveComments: 'some'
            }))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(tasks.dist_js.dest))
            .pipe(notify({
                title: 'Javascript',
                message: 'File minified successfully',
                onLast: true
            }))
            .on('error', notify.onError(function (error) {
                return 'Message to the notifier: '+ error.message;
            }));

    });

    gulp.task('dist_js_lint', function() {

        return gulp
            .src(tasks.dist_js.source)
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(gulp.dest(tasks.dist_js.dest))
            .pipe(notify({
                title: 'Javascript',
                message: 'File linted successfully',
                onLast: true
            }))
            .on('error', notify.onError(function (error) {
                return 'Message to the notifier: '+ error.message;
            }));

    });

    // LESS
    // ------------------------------------------------------------------------------------------------------
    gulp.task('dist_less', function() {

        return gulp
            .src(tasks.dist_less.source)
            .pipe(less())
            .pipe(gulp.dest(tasks.dist_less.dest))
            .pipe(notify({
                title: 'LESS',
                message: 'File compiled successfully',
                onLast: true
            }))
            .on('error', notify.onError(function (error) {
                return 'Message to the notifier: '+ error.message;
            }));

    });

    gulp.task('dist_less_min', function() {

        return gulp
            .src(tasks.dist_less.source)
            .pipe(less())
            .pipe(minifyCSS({
                keepSpecialComments: 1
            }))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(tasks.dist_less.dest))
            .pipe(notify({
                title: 'LESS',
                message: 'File compiled successfully',
                onLast: true
            }))
            .on('error', notify.onError(function (error) {
                return 'Message to the notifier: '+ error.message;
            }));

    });

    gulp.task('doc_less_main', function() {

        return gulp
            .src(tasks.doc_less_main.source)
            .pipe(less())
            .pipe(minifyCSS())
            .pipe(gulp.dest(tasks.doc_less_main.dest))
            .pipe(notify({
                title: 'LESS',
                message: 'Main compiled successfully',
                onLast: true
            }))
            .on('error', notify.onError(function (error) {
                return 'Message to the notifier: '+ error.message;
            }));

    });

    gulp.task('doc_less_views', function() {

        return gulp
            .src(tasks.doc_less_views.source)
            .pipe(less())
            .pipe(minifyCSS())
            .pipe(gulp.dest(tasks.doc_less_views.dest))
            .pipe(notify({
                title: 'LESS',
                message: 'Views compiled successfully',
                onLast: true
            }))
            .on('error', notify.onError(function (error) {
                return 'Message to the notifier: '+ error.message;
            }));

    });

    // Tests
    // ------------------------------------------------------------------------------------------------------
    gulp.task('tests', function() {

        return gulp
            .src('tests/index.html')
            .pipe(qunit());

    });

    // Build
    // ------------------------------------------------------------------------------------------------------
    gulp.task('build', [
        'dist_js_lint',
        'dist_js_min',
        'dist_less',
        'dist_less_min'
    ]);

    // Watching files
    // ------------------------------------------------------------------------------------------------------
    gulp.task('watch', function() {

        // Javascript
        // --------------------------------------------------------------------------------------------------
        gulp.watch(tasks.dist_js.source, ['dist_js_lint']);

        // LESS
        // --------------------------------------------------------------------------------------------------
        gulp.watch(tasks.doc_less_main.source, ['doc_less_main']);
        gulp.watch(doc_path +'less/app/**/*.less', ['doc_less_main', 'doc_less_views']);

    });

    // Default tasks (called when running `gulp` from cli)
    // ------------------------------------------------------------------------------------------------------
    gulp.task('default', [
        'doc_less_main',
        'doc_less_views',
        'watch'
    ]);

}());
