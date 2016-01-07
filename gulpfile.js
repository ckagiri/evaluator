var fs = require('fs'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    uglify = require('uglify-js');

var ENTRY = './index.js',
    FILE = 'matheval.js',
    FILE_MIN = 'matheval.min.js',
    FILE_MAP = 'matheval.map',
    DIST = './dist',
    MATHEVAL_JS = DIST + '/' + FILE;

var webpackConfig = {
    entry: ENTRY,
    output: {
        library: 'matheval',
        libraryTarget: 'umd',
        path: DIST,
        filename: FILE
    },
    externals: [],
    plugins: [],
    cache: true
};

var uglifyConfig = {
    outSourceMap: FILE_MAP,
    output: {
        comments: /@license/
    }
};

// create a single instance of the compiler to allow caching
var compiler = webpack(webpackConfig);

gulp.task('bundle', function (cb) {
    compiler.run(function (err, stats) {
        if (err) {
            gutil.log(err);
        }

        gutil.log('bundled ' + MATHEVAL_JS);

        cb();
    });
});

gulp.task('minify', ['bundle'], function () {
    var oldCwd = process.cwd();
    process.chdir(DIST);

    try {
        var result = uglify.minify([FILE], uglifyConfig);

        fs.writeFileSync(FILE_MIN, result.code);
        fs.writeFileSync(FILE_MAP, result.map);

        gutil.log('Minified ' + FILE_MIN);
        gutil.log('Mapped ' + FILE_MAP);
    } catch (e) {
        throw e;
    } finally {
        process.chdir(oldCwd);
    }
});

// The default task (called when you run `gulp`)
gulp.task('default', ['bundle', 'minify']);

// The watch task (to automatically rebuild when the source code changes)
gulp.task('watch', ['bundle', 'minify'], function () {
    gulp.watch(['index.js', 'lib/**/*.js'], ['bundle', 'minify']);
});
