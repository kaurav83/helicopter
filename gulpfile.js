var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var gulpIf = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var reload = browserSync.reload;

gulp.task('ES6', () => {
    return gulp.src('./src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'))
        .pipe(reload({
            stream: true
        }))
});

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

var paths = {
    html: ['./src/html/index.html']
};

gulp.task('html', function () {
    gulp.src(paths.html)
        .pipe(gulp.dest('dist'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('styles', function () {
    return gulp.src('./src/scss/main.scss')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'Styles',
                    message: err.message
                };
            })
        }))
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: [
                'last 3 version',
                '> 1%',
                'ie 8',
                'ie 9',
                'Opera 12.1',
                'android 2.3',
                'Android >= 4',
                'Firefox ESR'
            ]
        }))
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload({
            stream: true
        }))
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './dist',
            index: 'index.html'
        },
        port: 3000,
        open: true,
        notify: false
    });
});

gulp.task('watcher', function () {
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch(paths.html, ['html']);
    gulp.watch('src/js/index.js', ['ES6']);
});

gulp.task('default', ['watcher', 'browserSync'], function () {
    var buildFonts = gulp.src(
            'src/fonts/**/*'
        )
        .pipe(gulp.dest('dist/fonts'))

    var buildImg = gulp.src(
            'src/img/**/*'
        )
        .pipe(gulp.dest('dist/img'))
});