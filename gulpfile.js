var gulp = require('gulp'),
    sass=require('gulp-sass'),
    browserSync=require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.+(scss|sass)')
  .pipe(sass())
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
})
gulp.task('scripts', function () {
  return gulp.src(
    ['app/libs/jquery/dist/jquery.min.js', 'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js', 'app/libs/bootstrap/dist/js/bootstrap.min.js']
  ).pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));

})
gulp.task('css-libs', function () {
  return gulp.src('app/css/libs.css')
  .pipe(cssnano())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('app/css'))
})

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('clean', function () {
  return del(['!dist', 'dist/**/*']);
});
gulp.task('clear', function () {
  return cache.clearAll();
});

gulp.task('img', function () {
  return gulp.src('app/img/**/*')
  .pipe(cache(imagemin({
    interlaced: true,
    progresive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  })))
  .pipe(gulp.dest('dist/img'))
})

gulp.task('watch', gulp.parallel('browser-sync', 'sass', 'css-libs', 'scripts',
  function () {
    gulp.watch('app/sass/**/*.+(scss|sass)', gulp.series('sass'));
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
}));

gulp.task('build', gulp.series('clean', 'sass', 'scripts', 'img', function (done) {

  var buildCss = gulp.src([
    'app/css/main.css',
    'app/css/libs.min.css',
  ]).pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('app/js/**/*')
  .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('app/*.html')
  .pipe(gulp.dest('dist'));

  done();


}))
