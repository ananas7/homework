const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');

gulp.task('browserify', function() {
    return browserify('index.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./'));
});
