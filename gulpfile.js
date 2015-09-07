'use strict'

var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	jshint = require('gulp-jshint');

var options = {
	src : 'src',
	dist: 'dist'
}

gulp.task('browserSync', ['compileSass'], function(){
	return browserSync({
			server: {
				baseDir: options.src + '/'
			}
		})
})

gulp.task('watch', ['browserSync'], function(){
	    gulp.watch(options.src + '/*.html', [browserSync.reload]);
		gulp.watch(options.src + '/sass/main.scss', ['compileSass']);
		return gulp.watch(options.src + '/css/*.css', [browserSync.reload]);
})

gulp.task('compileSass', function() {
	return gulp.src(options.src + '/sass/main.scss')
			.pipe(maps.init())
			.pipe(sass())
			.pipe(maps.write('./'))
			.pipe(gulp.dest(options.src + '/css'));
})

gulp.task('dev', ['watch'], function() {
	return gulp.src(options.src + '/js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
})



gulp.task('default', function(){

})
