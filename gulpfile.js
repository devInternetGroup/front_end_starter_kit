var gulp = require('gulp'),
		webserver = require('gulp-webserver'),
		plumber = require('gulp-plumber'),
		minifyCSS = require('gulp-minify-css'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),
		//angularProtractor = require('gulp-angular-protractor'),
		protractor = require("gulp-protractor").protractor,
		webdriver_standalone = require("gulp-protractor").webdriver_standalone,
		webdriver_update = require("gulp-protractor").webdriver_update,
		wiredep = require('wiredep');

gulp.task('webserver', function() {
	gulp.src('app')
		.pipe(webserver({
			fallback: 'index.html',
			livereload: true,
			open: true
		}));
});

gulp.task('styles', function() {

	gulp.src(['app/sass/main.scss'])
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true,
			style: 'expanded',
			sourceComments: 'normal'
		}))
		.pipe(minifyCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/build/css'));
});

// Downloads the selenium webdriver
gulp.task('webdriver_update', webdriver_update);

// Start the standalone selenium server
// NOTE: This is not needed if you reference the
// seleniumServerJar in your protractor.conf.js
gulp.task('webdriver_standalone', webdriver_standalone);

gulp.task('e2e', ['webdriver_update'], function(){

	gulp.src(['./app/test/e2e/**/*.spec.js'])
		.pipe(protractor({
			'configFile': './app/test/e2e/protractor.config.js'
		}))
		.on('error', function(e) { throw e });
});

gulp.task('bower', function () {
	wiredep({
		src: './app/index.html',
		directory: '.app/bower_componets/',
		exclude: ['.app/bower_componets/susy', '.app/bower_componets/breakpoint-sass', '.app/bower_componets/sassy-map'],
		bowerJson: require('./bower.json'),
	});
});

gulp.task('watch', function(){

	gulp.watch(['app/sass/**/*.scss','app/sass/*.scss'] ['styles']);
});

gulp.task('default', ['styles', 'watch', 'webserver']);
