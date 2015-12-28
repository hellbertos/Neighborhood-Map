// include gulp
var gulp = require('gulp');

// include plug-ins
/*var jshint = require('gulp-jshint');*/
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cssmin = require('gulp-cssmin');
var jsmin = require('gulp-jsmin');
var htmlmin = require('gulp-htmlmin');
var rename = require("gulp-rename");

// JS hint task
/*gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});*/

gulp.task('minifyjs', function () {
	return gulp.src('js/*.js')
		.pipe(jsmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('minifycss', function () {
	return gulp.src('css/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('minifyhtml', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('minifyimages', function() {
	return gulp.src('img/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'));
});


// Fire all the task above when inputing 'gulp' in CLI
gulp.task('default', ['minifyjs', 'minifycss', 'minifyhtml', 'minifyimages']);