/**
 * Created by jonad on 11/3/16.
 */
'use strict';

var express = require('express');
var gzippo = require('gzippo');
var app = express();

app.use(gzippo.staticGzip('build'));
app.listen(process.env.PORT || 5000);
