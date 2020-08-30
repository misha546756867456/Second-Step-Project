const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

gulp.task('scss', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(concat('style.css'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('script.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function () {
    return gulp.src('./**/*.html')
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('script', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function () {
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('emptyDist', function () {
    return del('./dist/**');
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
});
gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('./**/*.html', gulp.parallel('html'));
    gulp.watch('src/js/*.js', gulp.parallel('js'));
});

gulp.task('dev', gulp.parallel('browser-sync', 'watch'));
gulp.task('build', gulp.parallel('emptyDist', 'scss', 'js', 'images', 'browser-sync', 'watch'));
