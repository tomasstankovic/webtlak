const gulp = require('gulp');
const args = require('yargs').argv;
const autoprefixer = require('gulp-autoprefixer');
const bump = require('gulp-bump');
const imagemin = require('gulp-imagemin');
const livereload = require('gulp-livereload');
const minifyCSS = require('gulp-minify-css');
const mocha = require('gulp-mocha');
const nib = require('nib');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const rimraf = require('gulp-rimraf');
const runSequence = require('run-sequence');
const shell = require('gulp-shell');
const size = require('gulp-size');
const stylus = require('gulp-stylus');
const pngquant = require('imagemin-pngquant');
const webpack = require('gulp-webpack');

let VERSION;

const paths = {
  scriptsFrontend: ['./client/js/**/*.js'],
  scripts: [
    './client/js/**/*.js',
    '!./client/js/lib/**/*.js',
    '!./client/js/bower_components/**/*.js',
    './server/**/*.js'
  ],
  images: './client/img/**/*.{png,jpg,jpeg,gif}',
  stylus: ['./client/css/app.styl'],
  css: ['./build/css/app.css']
};

gulp.task('clean', function () {
  return gulp.src(['./build/js', './build/css', './build/deps.js'], {
    read: false
  })
    .pipe(rimraf({
      force: true
    }));
});

gulp.task('imagemin', function () {
  return gulp.src(paths.images)
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./build/img'));
});

gulp.task('image-copy', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest('./build/img'));
});

gulp.task('stylus', function () {
  return gulp.src(paths.stylus)
    .pipe(plumber())
    .pipe(stylus({
      errors: true,
      use: [nib()],
      'include css': true
    }))
    .pipe(autoprefixer(['> 1%', 'last 2 versions', 'ie 8', 'ie 9']))
    .pipe(minifyCSS())
    .pipe(size({
      showFiles: true
    }))
    .pipe(size({
      showFiles: true,
      gzip: true
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('set-ulimit', shell.task([
  'ulimit -n 10240'
]));

gulp.task('test', function () {
  return gulp.src('test/**/*.test.js', {
    read: false
  })
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('test-deployed', function () {
  return gulp.src('test/**/*.test.js', {
    read: false
  })
    .pipe(mocha({
      reporter: 'spec'
    }))
    .once('end', function () {
      process.exit();
    });
});

gulp.task('webpack', function () {
  return gulp.src('./client/js/main.js')
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest('./build/js/'));
});


gulp.task('bump', function () {
  return gulp.src(['./package.json'])
    .pipe(bump({
      type: VERSION
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('dev', ['stylus', 'test']);

gulp.task('build', function () {
  runSequence('clean', 'stylus', 'test', 'webpack', 'imagemin');
});

/**
 *  gulp release --version major|minor|patch
 *  gulp release -v major|minor|patch
 */
gulp.task('release', function () {
  VERSION = args.v || args.version;

  if (typeof VERSION !== 'undefined') {
    runSequence('clean', 'stylus', 'test', 'webpack', 'imagemin', 'bump');
  } else {
    console.log('SORRY, app --version parameter missing.');
  }
});

gulp.task('start-server', function () {
  nodemon({
    script: 'server/app.js',
    exec: 'node',
    watch: ['server/**/*.js']
  }).on('start');

  livereload.listen();
  gulp.watch(['client/css/**/*.styl'], ['stylus']);
  gulp.watch(['client/js/**/*.js', '!/client/js/build.js'], ['webpack']);
  gulp.watch(['test/**/*.js'], ['test']);
  gulp.watch(['build/css/app.css', 'build/img/**', 'server/views/**/*.jade']).on('change', livereload.changed);
  gulp.watch(['build/js/build-dev.js']).on('change', livereload.reload);
  gulp.watch(['client/img/**/*'], ['image-copy']);
});

gulp.task('server', ['dev', 'start-server']);
gulp.task('default', ['set-ulimit', 'dev', 'start-server']);
