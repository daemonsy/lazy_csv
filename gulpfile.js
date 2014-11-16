var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    connect = require('gulp-connect');

gulp.task('javascripts', function() {
  gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('./public/js'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('stylesheets', function(){
  gulp.src('./src/css/**/*.{scss, css}')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(connect.reload());

  gulp.src('./src/css/**/*.css')
    .pipe(gulp.dest('./public/css'))
    .pipe(connect.reload());
});

gulp.task('demo', function () {
  gulp.src('./app/js/**/*')
    .pipe(gulp.dest('./public/js'))
    .pipe(connect.reload());

  gulp.src('./app/css/**/*')
    .pipe(gulp.dest('./public/css'))
    .pipe(connect.reload());

  gulp.src('./app/html/**/*')
    .pipe(gulp.dest('./public'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('./src/js/**/*.js', function() {
    gulp.run('javascripts');
  });

  gulp.watch('./src/css/**/*.{css,scss}', function() {
    gulp.run('stylesheets');
  });

  gulp.watch('./app/**/*', function() {
    gulp.run('demo');
  });
});

gulp.task('default', ['watch', 'demo', 'stylesheets', 'javascripts', 'connect']);
