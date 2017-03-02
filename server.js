var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


var connection = require('./db/connection');


//routes
var upload = require('./routes/upload.js');

// connection.connect();

var app = express();


app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/upload', upload);

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});



var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port ', server.address().port);
  console.log('Press Control + C to exit');
});
