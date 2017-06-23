var express  = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var app      = express();
// var mongoose = require('mongoose');
var port  	 = process.env.PORT || 8888;
//EZxCqBQ81a!EZxCqBQ81a!
// mongoose.connect('mongodb://usuario2:password@ec2-52-56-133-40.eu-west-2.compute.amazonaws.com:27017/admin');

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(favicon(__dirname + '/public/img/favicon.ico'));



app.use('/', express.static('public'));
app.use('/', express.static('views'));


var myMusicalRoutes = require('./app/routes/app');
app.use('/', myMusicalRoutes);

app.use(function(req, res, next) {
  res.status(404);
  res.redirect('/not-found');
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.listen(port);
console.log("Server started at: " + port);