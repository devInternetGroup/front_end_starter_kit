var gulp = require('gulp'),
		webserver = require('gulp-webserver'),
		plumber = require('gulp-plumber'),
		minifyCSS = require('gulp-minify-css'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps');

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


gulp.task('watch', function(){

	gulp.watch(['app/sass/**/*.scss','app/sass/*.scss'] ['styles']);
});

gulp.task('default', ['styles', 'watch', 'webserver']);