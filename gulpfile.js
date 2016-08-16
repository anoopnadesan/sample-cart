var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var jsFiles = ["app/lib/angular.min.js", "app/lib/ui-bootstrap-tpls-0.14.3.min.js", "app/js/app.js", "app/js/controllers.js", "app/js/services.js", "app/lib/angular-ui-router.min.js", "app/lib/angular-resource.min.js"];
var styleFiles = ["app/css/bootstrap.min.css", "app/css/app.css"];

gulp.task('concat-minify-js', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('main.js'))
        //.pipe(gulp.dest('dist/js'))
        //.pipe(rename('main.min.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('concat-minify-css', function() {  
    return gulp.src(styleFiles)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename('styles.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

var imagemin = require('gulp-imagemin');

gulp.task('images', function(){
  return gulp.src('app/assets/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin({
      // Setting interlaced to true
      interlaced: true
    }))
  .pipe(gulp.dest('dist/assets'))
});

var del = require('del');

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

var runSequence = require('run-sequence');

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['concat-minify-js', 'concat-minify-css', 'images'],
    callback
  )
});