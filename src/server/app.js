var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = require('./routes');

app.use(express.static('./'));
app.use('/404', router);
app.use(express.static('./src/client/'));
app.use('/*', express.static('./src/client/index.html'));

app.listen(port, function(err){
  console.log('running server on port '+ port);
});
