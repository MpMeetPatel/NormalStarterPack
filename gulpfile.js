var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var typescript = require('gulp-typescript');
var imgmin = require('gulp-imagemin');


//Message to just Print
gulp.task('message',function () {
  console.log('Gulp is Running fine');
});

//copy HTML files
gulp.task('html',function () {
  gulp.src('src/*.html')
  .pipe(gulp.dest('dist/'));
});

// STYLES TASK
//sass
//copy sass files
gulp.task('sass-copy',function () {
  gulp.src('src/scss/custom.scss')
  .pipe(gulp.dest('dist/scss'));
});

gulp.task('sass',function () {
  gulp.src(['src/scss/bootstrap/bootstrap.scss','src/scss/custom.scss'])
  .pipe(plumber())
  .pipe(sass())
  .pipe(gulp.dest('dist/css/'));
});

// SCRIPTS TASK
// Compiling TS to JS
// gulp.task('typescript', function () {
//     gulp.src('src/js/**/*.ts')
//         .pipe(plumber())
//         .pipe(typescript ({  noImplicitAny: true,  outFile: 'output.js'}))
//         .pipe(gulp.dest('dist/js/'));
// });

//Unglifying JS files
gulp.task('scripts', function () {
  pump([
        gulp.src(['src/js/custom.js','node_modules/jquery/dist/jquery.js','node_modules/bootstrap/dist/js/bootstrap.js','node_modules/popper.js/dist/umd/popper.min.js']),
        uglify(),
        gulp.dest('dist/js/')
    ],

  );
});

//Images
gulp.task('image',function () {
  gulp.src('src/img/*')
  .pipe(imgmin())
  .pipe(gulp.dest('dist/img/'));
});

//Fonts copy
gulp.task('fonts',function () {
  gulp.src('src/fonts/**/*.*')
  .pipe(gulp.dest('dist/fonts/'));
});

//Watches on files
gulp.task('watch',function () {

  gulp.watch('src/*.html',['html']);
  gulp.watch('src/img/*',['image']);
  gulp.watch('src/scss/custom.scss',['sass-copy']);
  gulp.watch('src/scss/**/*.scss',['sass']);
  gulp.watch('src/fonts/**/*',['fonts']);
  gulp.watch('src/js/**/*.ts',['typescript']);
  gulp.watch('src/js/**/*.js',['scripts']);

});

//Defaults

gulp.task('default',['message','html','image','sass-copy','sass','fonts','scripts','watch']);
