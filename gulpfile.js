'use strict';

var gulp 		= require('gulp')
  , gutil 		= require('gulp-util')
  , prefixer 	= require('gulp-autoprefixer')
  , sass 		= require('gulp-sass')
  , coffee 		= require('gulp-coffee')
  , rename		= require('gulp-rename')
  , sourcemaps 	= require('gulp-sourcemaps')
  , uglify 		= require('gulp-uglify')
  , minifyCSS 	= require('gulp-minify-css')
  , gif 		= require('gulp-if');


var paths = {
	src: {
		sass: 'src/*.scss',
		coffee: 'src/*.coffee'
	},
	dist: 'dist/'
};

var minify = (0 <= process.argv.indexOf('--minify'))
  , maps = (0 <= process.argv.indexOf('--maps'));

gulp.task('default', ['sass', 'coffee'], function() {

});

gulp.task('watch', function() {
	gulp.watch(paths.src.sass, ['sass']);
	gulp.watch(paths.src.coffee, ['coffee']);
});

gulp.task('sass', function() {
	return gulp.src(paths.src.sass)
		.pipe(sass().on('error', sass.logError))
		.pipe(prefixer({
			browsers: ['last 3 versions', 'IE 10']
		}))
		.pipe(gulp.dest(paths.dist))
		.pipe(rename('growl-alert.min.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest(paths.dist));
});

gulp.task('coffee', function() {
	return gulp.src(paths.src.coffee)
		.pipe(gif(maps, sourcemaps.init() ))
		.pipe(coffee({ bare: true })).on('error', gutil.log)
		.pipe(gif(maps, sourcemaps.write() ))
		.pipe(gulp.dest(paths.dist))
		.pipe(rename('growl-alert.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist));
});
