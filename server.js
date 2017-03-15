var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var pg = require('pg');
var data = require('./routes/data');
var index = require('./routes/index');
var standardReports = require('./routes/standardReports')


var connection = require('./db/connection');

var upload = require('./routes/upload');
var login = require('./routes/login');
var register = require('./routes/register');
var diagnosis = require('./routes/diagnosis');
var cities = require('./routes/cities');
var counties = require('./routes/counties');
var zipCodes = require('./routes/zipCodes');
var socialWorkerId = require('./routes/socialWorkerId');
var socialWorkerClinic = require('./routes/socialWorkerClinic');
var doctorClinic = require('./routes/doctorClinic');
var doctorId = require('./routes/doctorId');
var state = require('./routes/state');
var register = require('./routes/register')
var barChart= require('./routes/barChart');
var barChart2= require('./routes/barChart2');


require('./auth/setup');


//routes
var upload = require('./routes/upload');



connection.connect();


var app = express();

var sessionConfig = {
  secret: process.env.SECRET || 'super duper secret key goes here',
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000, // 30 minutes
    secure: false
  }
}

app.use(session(sessionConfig));
app.use(bodyParser.json({limit: 20000000}));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

// no auth needed

app.use('/login', login);
app.use('/register', register)
// app.use('/upload', upload);
app.get('/loginStatus', function(req, res){
  res.send(req.isAuthenticated());
});


// the following routes require authentication
app.use('/private', ensureAuthenticated);
app.use('/upload', upload);
app.use('/barChart', barChart);
app.use('/barChart2', barChart2);
// app.get('/private/secretInfo', function(req, res){
//   console.log('Sending secret info');
//   res.send('This is very secret!');
// });


function ensureAuthenticated(req, res, next) {
  console.log('Ensuring the user is authenticated');
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  };
};

app.use('/data', data);
app.use('/standardReports', standardReports);
app.use('/upload', upload);
app.use('/diagnosis', diagnosis);
app.use('/cities', cities);
app.use('/counties', counties);
app.use('/zipCodes', zipCodes);
app.use('/socialWorkerId', socialWorkerId);
app.use('/socialWorkerClinic', socialWorkerClinic);
app.use('/doctorClinic', doctorClinic);
app.use('/doctorId', doctorId);
app.use('/state', state);
app.use('/', index);



var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port ', server.address().port);
  console.log('Press Control + C to exit');
});
