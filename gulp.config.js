/**
 * Created by jonad on 11/1/16.
 */
module.exports = function(){

  var client = './src/client/';
  var clientApp = client + 'app/';
  var temp =  './tmp/';
  var server = './src/server/';

  var config = {

    temp: temp,
    html : '**/*.html',

    /**
     * Files paths
     */
    client : client,
    alljs: [
      '*.js',
      './src/**/*.js'
    ],
    index : client + 'index.html',
    js : [
        clientApp + '**/*.module.js',
        clientApp + '**/*.js',
        '!' + clientApp + '**/*.spec.js'

    ],

    css : temp + 'styles/styles.css',

    less : client + 'styles/styles.less',
    server : server,
    htmltemplates: clientApp + '**/*.html',
    images : client + 'images/**/*.*',
    fonts: './bower_components/components-font-awesome/fonts/**/*.*',

    /**
     * Optimized files
     */
    optimized: {
      app : 'app.js',
      lib : 'lib.js'
    },

    /**
     * Bower and NPM locations
     */
    bower: {
      json: require('./bower.json'),
      directory: './bower_components',
      ignorePath: '../..'
    },
    /**
     * Browser sync
     */
    browserReloadDelay : 1000,
    build : './build/',

    /**
     * Node settings
     */
    defaultPort : 3000,
    nodeServer : './src/server/app.js',

    /**
     * template cache
     */
    templateCache: {
      file: 'template.js',
      options: {
        module: 'core',
        standAlone: false,
        root: 'app/'
      }

    }

  };

  config.getWiredepDefaultOptions = function(){

    var options = {
      bowerJson : config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath

    };

    return options;
  };

  return config;

};
