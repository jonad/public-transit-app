var express = require('express');
var app = express();
var port = process.env.PORT || 7000;
var environment = process.env.NODE_ENV;
var gzippo = require('gzippo');
var router = require('./routes');


switch (environment){
  case 'build':
    console.log('** Build **');
    app.use(express.static('./build/'));
    app.use('/*', express.static('./build/index.html'));
    break;
  default:
    app.use(express.static('./'));
    app.use('/404', router);
    app.use(express.static('./src/client/'));
    app.use('/*', express.static('./src/client/index.html'));

}

app.listen(port, function(err){
  console.log('running server on port '+ port);
});
