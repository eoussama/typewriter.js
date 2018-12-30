const
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    beautify = require('gulp-beautify'),
    uglify = require('gulp-uglify');

// Building the code for.
gulp.task('build', () => {

    return gulp.src('src/typewriter.js')

        // Translating code.
        .pipe(babel({
            presets: ['@babel/env']
        }))

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

        // Copying the file to the docs's assets.
        .pipe(gulp.dest('docs/assets/js/lib'));
});

// Gulp's default script.
gulp.task('default', gulp.series(['build']));
