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
    rename      = require('gulp-rename');

// Source path
// ------------------------------------------------------------------------------------------------------
var source = 'dist/';

// Tasks configuration
// ------------------------------------------------------------------------------------------------------
var tasks = {
    'js': {
        source: source +'js/jquery.desoslide.js',
        dest:   source +'js'
    },
    'css': {
        source: source +'css/jquery.desoslide.css',
        dest:   source +'css'
    }
};

// Javascript
// ------------------------------------------------------------------------------------------------------
gulp.task('js', function() {

    return gulp
        .src([tasks.js.source])
        .pipe(uglify())
        .pipe(rename(function (dir, base, ext) {
            return base + '.min' + ext;
        }))
        .pipe(gulp.dest(tasks.js.dest));

});

// CSS
// ------------------------------------------------------------------------------------------------------
gulp.task('css', function() {

    return gulp
        .src([tasks.css.source])
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(rename(function (dir, base, ext) {
            return base + '.min' + ext;
        }))
        .pipe(gulp.dest(tasks.css.dest));

});


// Watching files
// ------------------------------------------------------------------------------------------------------
gulp.task('watch', function() {

    gulp.watch(tasks.js.source, ['js']);
    gulp.watch(tasks.css.source, ['css']);

});

// Default tasks (called when running `gulp` from cli)
// ------------------------------------------------------------------------------------------------------
gulp.task('default', [
    'js',
    'css'
]);
