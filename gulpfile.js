var gulp = require('gulp'),
	rimraf = require('gulp-rimraf'),
	rename = require('gulp-rename'),
	replace = require('gulp-replace'),
	htmlreplace = require('gulp-html-replace'),
	stripDebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	concat = require('gulp-concat'),
	cssmin = require('gulp-minify-css');

gulp.task('clean', function() {
	return gulp.src('dist', {read: false}).pipe(rimraf());
});

gulp.task('center', ['clean'], function() {
	return gulp.src('src/center.js')
		.pipe(replace(localConfig.urls.center, productionConfig.urls.center))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist'));
});

gulp.task('images', ['clean'], function() {
	return gulp.src('build/images/**/*.png')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', ['clean'], function() {
	return gulp.src('build/fonts/*')
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('styles', ['clean'], function() {
	return gulp.src([
			'build/stylesheets/screen.css',
			'build/stylesheets/print.css'
		])
		.pipe(gulp.dest('dist/stylesheets'));
});

gulp.task('scripts', ['clean'], function() {
	return gulp.src([
			'build/javascripts/all_nosearch.js'
		])
		.pipe(concat('all.js'))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/javascripts'));
});

gulp.task('build', ['scripts', 'styles', 'fonts', 'images'], function() {
	return gulp.src('build/index.html')
		.pipe(replace('all_nosearch.js', 'all.min.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['build'], function() {
	console.log('All done, master!');
});
