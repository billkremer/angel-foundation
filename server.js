var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var data = require('./routes/data');
var index = require('./routes/index');


// var connection = require('./db/connection');



// connection.connect();

var app = express();


app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/data', data);
app.use('/', index);




var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port ', server.address().port);
  console.log('Press Control + C to exit');
});
