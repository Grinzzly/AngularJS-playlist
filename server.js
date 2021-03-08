var express  = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var app      = express();
var mongoose = require('mongoose');
var port  	 = process.env.PORT || 8888;

//PLl5VZap3gHFkkEV
mongoose.connect('mongodb://Admin:PLl5VZap3gHFkkEV@klikatechcluster-shard-00-00-kx2pc.mongodb.net:27017,klikatechcluster-shard-00-01-kx2pc.mongodb.net:27017,klikatechcluster-shard-00-02-kx2pc.mongodb.net:27017/KlikaTech?ssl=true&replicaSet=KlikaTechCluster-shard-0&authSource=admin');
//mongoose.connect('mongodb://Administrator:GE-cizFxiSu@ec2-34-253-184-31.eu-west-1.compute.amazonaws.com:27017/KlikaTech');
//mongoose.connect('mongodb://127.0.0.1:27017/KlikaTech');

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
