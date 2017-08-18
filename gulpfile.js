var gulp = require('gulp'),
       tsc = require('gulp-typescript'),
       config = require('./gulp.config')(),
       tsProject = tsc.createProject('tsconfig.json'),
       typings = require('typings'),
       sourcemaps =require('gulp-sourcemaps'),
       browser = require('browser-sync'),
       clean = require('gulp-clean'),
       cache = require('gulp-cache'),
       spritesmith = require('gulp.spritesmith'),
       imagemin = require('gulp-imagemin'),
       pngquant = require('imagemin-pngquant'),
       jade = require('gulp-jade'),
       notify = require('gulp-notify'),
       uncss = require('gulp-uncss'),
       sass = require('gulp-sass'),
       htmlmin = require('gulp-htmlmin'),
       htmlhint = require("gulp-htmlhint"),
       replace = require('gulp-replace'),
       useref = require('gulp-useref'),
       gulpif = require('gulp-if'),
       uglify = require('gulp-uglify'),
       minifyCss = require('gulp-minify-css'),
       concat = require('gulp-concat'),
       sysBuilder = require('systemjs-builder'),
       autoprefixer = require('gulp-autoprefixer'),
       fs = require('fs');

// Cleaner
gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

// Clear Cache
gulp.task('clear', function () {
  return cache.clearAll();
});

// Copy libs
gulp.task('copy:libs', function(){
  //Fonts
  gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  //htaccess
  gulp.src('src/.htaccess')
    .pipe(gulp.dest('dist/'));

   // PHP
  gulp.src('src/php/**/*')
    .pipe(gulp.dest('dist/php'));

  // gulp.src(['node_modules/rxjs/**/*'])
  //   .pipe(gulp.dest('public/lib/js/rxjs'));

  gulp.src(['app/**/*.js'])
    .pipe(gulp.dest('dist/scripts'));
});

// Sprites JPG PNG
gulp.task('sprite', function () {
  var spriteData = gulp.src('src/img/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.sass',
    padding: 10
  }));
  return spriteData.pipe(gulp.dest('src/css'));
});

// Image-min
gulp.task('img', () => {
    return gulp.src(['src/img/**','src/css/*.png'],{base: 'src'})
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist'));
});

// Jade
gulp.task('jade', function() {
var config = JSON.parse(fs.readFileSync('src/content.json'));

     gulp.src('*.jade')
    .pipe(jade({
      locals: config,
      pretty: true
    }))
    .on('error', notify.onError(function(err){
      return{
        title: 'ERORR in JADE',
        message: err.message,
        sound: true,
        icon: 'notify.png'
      }
    }))
    .pipe(gulp.dest('.'))
});

// Autoprefix css
gulp.task('uncss', function () {
    return gulp.src('dist/css/*.css')
        .pipe(uncss({
        html: ['dist/index.html']
        }))
        .pipe(autoprefixer({
            browsers: ['last 40 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'));
});

// Sass
gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass.sync().on('error', notify.onError(function(err){
      return{
        title: 'Erorr in SASS',
        message: err.message,
        sound: true,
        icon: 'notify.png'
      }
    })))
    .pipe(gulp.dest('src/css'))
    .pipe(browser.reload({stream: true}))
});

// HtmL
gulp.task('html', function() {
  gulp.src('dist/*.html')
    .pipe(htmlhint())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(replace('<!--Styles--><link rel="stylesheet" href="css/vendor.min.css"><link rel="stylesheet" href="css/main.min.css">', ''))
    .pipe(replace('src/img', 'img'))
    .pipe(replace('src/fonts', 'fonts'))
    .pipe(gulp.dest('dist'));

});

// Compile-ts
gulp.task('compile-ts', function(){
  var sourceTs = [
    config.allTs,
    './main.ts',
    config.typings
  ]
  var result= gulp
  .src(sourceTs)
  .pipe(sourcemaps.init())
  .pipe(tsProject())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(config.outTs));
})


// Watching
gulp.task('watch', ['sass', 'jade'], function(){
  gulp.watch('app/**/*.js', browser.reload);
  gulp.watch(['*.jade', 'src/jade/**/*.jade'], ['jade'], browser.reload);
  gulp.watch('./src/scripts/**/*.js', browser.reload);
  gulp.watch('src/sass/**/*.sass', ['sass'], browser.reload);
  gulp.watch('index.html', browser.reload);
  browser({
    server: {
      baseDir: './'
    }
    })
  });

// Builder
gulp.task('build',['clean', 'img','copy:libs', 'uncss'], function () {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(useref())
        .pipe(gulp.dest('dist'));
})








