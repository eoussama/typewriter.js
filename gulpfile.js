const
	gulp = require('gulp'),
	babel = require('gulp-babel'),
	watch = require('gulp-watch'),
	rename = require('gulp-rename'),
	beautify = require('gulp-beautify'),
	uglify = require('gulp-uglify');


/**
 * Transpiles es6 code into javascript
 * and builds for production.
 */
function build() {
	return gulp.src('src/typewriter.es6')

		// Translating code.
		.pipe(babel())

		// Beautifying the code.
		.pipe(beautify())

		// Placing the result in the `dist` folder.
		.pipe(gulp.dest('dist'))

		// Minifying the code.
		.pipe(uglify())

		// Affixing `.min` to the file.
		.pipe(rename({ suffix: '.min' }))

		// Placing the file un the `dist` folder.
		.pipe(gulp.dest('dist'))
}


// Building the code for production.
gulp.task('build', () => {
	return build();
});


// Watch mode.
gulp.task('build:watch', () => {
	return watch('src/typewriter.es6', () => {
		return build();
	});
});


// Gulp's default script.
gulp.task('default', gulp.series(['build']));
