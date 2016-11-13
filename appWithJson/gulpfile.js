const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const watchify = require('watchify');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const _ = require('lodash');
const pretty = require('prettysize');
const path = require('path');

const myOpts = {
    entries: './src/index.jsx',
    debug: true,
    extensions: ['.jsx']
};
const dir = './target/';

gulp.task('build', function() {
    browserify(myOpts)
        .transform('babelify', {
            presets: ['es2015', 'react']
        })
        .bundle()
        .on('error', function(err){
            gutil.log(gutil.colors.red.bold('[browserify error]'));
            gutil.log(err.message);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest(dir));
});

gulp.task('watch', function(cb) {
    clientCode(true);
});

gulp.task('watch2', function(cb) {
    gulp.watch('./src/index.jsx', ['build']);
});

function clientCode(watching) {
    const config = _.extend({}, watchify.args, {
        debug: true
    });
    let b;
    if (watching) {
        const wConfig = {
            verbose: true
        };
        b = watchify(browserify(config), wConfig);
    } else {
        b = browserify(config);
    }
    b = b.add('./src/index.jsx')
        .transform(babelify, {
            global: true,
            presets: ['es2015', 'react'],
        });
    if (watching) {
        b.on('log', function(message) {
            const match = message.match(/^(\d+) bytes written \((.*)\)$/);
            if (match) {
                message = pretty(parseInt(match[1], 10)) + ' in ' + match[2];
            }
            gutil.log(message);
        });
        b.on('update', bundle);
    }
    return bundle();

    function bundle(files) {
        if (files) {
            files.forEach(function(file) {
                gutil.log(gutil.colors.blue(path.relative(__dirname, file)));
            });
        } else {
            gutil.log('client-watch first run');
        }
        return b.bundle()
            .on('error', function(error) {
                gutil.log(error.toString().replace('Error: ', ''));
            })
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./maps/', {
                sourceRoot: '/maps/'
            }))
            .pipe(gulp.dest(dir));
    }
}
