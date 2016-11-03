
var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;
var browserSync = require('browser-sync');



//vet
gulp.task('vet', function() {
  log('Analyzing source with JSHint an JSCS');
  return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish',
          { verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

// compile less to css

gulp.task('styles', ['clean-styles'] , function(){
  log('Compiling Less --> CSS');

  return gulp
    .src(config.less) //TODO add the config
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe(gulp.dest(config.temp + 'styles'));
});

// clean styles

gulp.task('clean', function(){

  var delConfig = [].concat(config.build, config.temp);
  log('Cleaning: ' + $.util.colors.blue(delConfig))
  del(delConfig);
});

// serve build
gulp.task('serve-build', ['optimize'], function(){
      serve(false);
});

gulp.task('clean-styles', function(){

  var files = config.temp + '**/*.css';
  clean(files);
});

gulp.task('optimize', ['inject' , 'fonts', 'images'], function(){

  log('Optimizing the javascript, css, html');

  var templateCache = config.temp + config.templateCache.file;
 var assets = $.useref({ searchPath: './'});
  var cssFilter = $.filter('**/*.css', {restore: true});
  var jsLibFilter = $.filter('**/' + config.optimized.lib, {restore: true});
  var jsAppFilter =  $.filter('**/' + config.optimized.app, {restore: true});

    return gulp
          .src(config.index)
          .pipe($.plumber())
          .pipe($.inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates:js -->'
          }))
         .pipe(assets)
          .pipe(cssFilter)
          .pipe($.csso())
          .pipe(cssFilter.restore)
          .pipe(jsLibFilter)
          .pipe($.uglify())
          .pipe(jsLibFilter.restore)
          .pipe(jsAppFilter)
          .pipe($.ngAnnotate())
          .pipe($.uglify())
          .pipe(jsAppFilter.restore)
          .pipe($.rev())
          .pipe($.revReplace())
          .pipe(gulp.dest(config.build))
          .pipe($.rev.manifest())
          .pipe(gulp.dest(config.build));

});
gulp.task('clean-fonts', function(){

  var files = config.build + 'fonts/**/*.*';
  clean(files);
});

gulp.task('clean-code', function(){

  var files = [].concat(
    config.temp + '**/*.js',
    config.build + '**/*.html',
    config.build + 'js/**/*.js');
  clean(files);
});

gulp.task('templatecache', ['clean-code'], function(){

  log('Creating AngularJS $templateCache');

  return gulp
          .src(config.htmltemplates)
          .pipe($.minifyHtml({empty: true}))
          .pipe($.angularTemplatecache(config.templateCache.file,
                config.templateCache.options))
          .pipe(gulp.dest(config.temp));
});


gulp.task('clean-images', function(){

  var files = config.build + 'images/**/*.*';
  clean(files);
});



gulp.task('less-watcher', function(){
  gulp.watch([config.less], ['styles']);
});


//HTML injection

gulp.task('wiredep', function(){
  log('wire up the bower css js and our app js into the html');
   var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;
    return gulp
      .src(config.index)
      .pipe(wiredep(options))
      .pipe($.inject(gulp.src(config.js)))
      .pipe(gulp.dest(config.client));
});

// inject styles files
gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function(){
  log('Wire up css into the html, after files are ready')
  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.css)))
    .pipe(gulp.dest(config.client));
});

// serve the dev
gulp.task('serve-dev', ['inject'], function() {
  serve(true);
  }
);

// font
gulp.task('fonts', ['clean-fonts'], function(){
  log('Copying fonts');
  return gulp
            .src(config.fonts)
            .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function(){
  log('Copying images');
  return gulp
    .src(config.images)
    .pipe($.imagemin({optimizationLevel: 4}))
    .pipe(gulp.dest(config.build + 'images'));
});


gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

// change event
function changeEvent(event){

  var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
  log('File ' + event.path.replace(srcPattern, '') + '' + event.type);

}

// template cache in angular



// sync with the browser
function startBrowserSync(isDev){

  var options = {
    proxy : 'localhost:' + port,
    port : 7000,
    files : isDev ? [
      config.client + '**/*.*',
      config.temp + '**/*.css',
      '!' + config.less

        ]: [],
    ghostMode : {
      clicks : true,
      location : false,
      forms : true,
      scroll : true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel : 'debug',
    logPrefix: 'Public Transit App',
    notify: true,
    reloadDelay: 1000

  };

  if(args.nosync ||  browserSync.active){
    return;
  }
  log('Starting browser-sync on port ' + port);
  if(isDev) {
    gulp.watch([config.less], ['styles'])
      .on('change', function (ev) {
        changeEvent(ev);
      });
  } else {
    gulp.watch([config.less, config.js, config.html], ['optimize', browserSyncReload])
      .on('change', function (ev) {
        changeEvent(ev);
      });
  }
  browserSync(options);

}



/////

function serve(isDev){

  var nodeOptions = {
    script: config.nodeServer, // TODO app.js
    delayTime : 1,
    env : {
      'PORT' : port,
      'NODE_ENV': isDev ? 'dev' : 'build',

    },
    watch : [config.server] // TODO define the files to restart on
  };


  return $.nodemon(nodeOptions)
    .on('restart', function(ev) {
      log('*** nodemon restarted ***');
      log('files changed on restart:\n' + ev);
      setTimeout(function(){
        browserSync.notify('Reloadinf now ...');
        browserSync.reload({ stream : false});

      }, config.browserReloadDelay);
    })
    .on('start', function(ev) {
      log('*** nodemon started ***');
      startBrowserSync(isDev);
    })
    .on('crash', function(ev) {
      log('*** nodemon crashed : script crashed for some reasons ***');
    })
    .on('exit', function() {
      log('** nodemon exited cleanly');
    });


}

function orderSrc(src, order) {
  //order = order || ['**/*'];
  return gulp
    .src(src)
    .pipe($.if(order, $.order(order)));
}


/////////////////////////

function log(msg){
  if(typeof(msg) === 'object'){
    for (var item in msg){
      if(msg.hasOwnProperty(item)){
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}

function clean(path){
  log('Cleaning: ' + $.util.colors.blue(path));
  del(path);
}

//gulp.task('heroku:production', ['serve-build']);
