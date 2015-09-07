'use strict'

var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	jshint = require('gulp-jshint'),
	del = require('del'),
	useref = require('gulp-useref'),
	iff = require('gulp-if'),
	uglify = require('gulp-uglify'),
	csso = require('gulp-csso');

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

gulp.task('html', function() {
    var assets = useref.assets();
    gulp.src(options.src + '/index.html')
        .pipe(assets)
        .pipe(iff('*.js', uglify()))
        .pipe(iff('*.css', csso()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(options.dist));
})

gulp.task('build', ['html'], function() {
	gulp.src([options.src + '/img/**'
			],
		{base: options.src}
	)
	.pipe(gulp.dest(options.dist));
})

gulp.task('clean', function() {
	del(['dist']);
})



gulp.task('default', function(){

})
