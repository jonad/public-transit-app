
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});


// files
var jsFiles = ['*.js', './src/**/*.js'];


//task to check style accross app
gulp.task('style', function() {
  return gulp.src(jsFiles)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish',
          { verbose: true}))
        .pipe($.jscs());
});

// task to automatically add dependency in the main file html
gulp.task('inject', function(){
  var wiredep = require('wiredep').stream;
  var injectFiles = ['./src/client/app/**/*.js', './src/client/**/*.css'];
  var jsOrder =  [
    '**/app.module.js',
    '**/*.module.js',
    '**/*.js',
    '**/app.css',
    '**/*.css'
  ];

  var wiredepOptions = {
    bowerJson: require('./bower.json'),
    directory : './bower_components',
    ignorePath: '../..'
  };

  var injectSrc = gulp.src(injectFiles, {read: false});

  return gulp.src('./src/client/index.html')
            .pipe(wiredep(wiredepOptions))
            .pipe($.inject(orderSrc(injectFiles, jsOrder)))
            .pipe(gulp.dest('./src/client'));
});

// task to serve the files
gulp.task('serve',  function(){

  var options = {
    script: './src/server/app.js',
    delay: 1,
    env: {
      'PORT': 3000
    }
  //  watch: jsFiles
  }

  return $.nodemon(options)
          .on('restart', function(ev){
            console.log('restarting ...');
          });


});


/////

function orderSrc(src, order) {
  //order = order || ['**/*'];
  return gulp
    .src(src)
    .pipe($.if(order, $.order(order)));
}





