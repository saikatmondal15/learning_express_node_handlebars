var express = require('express');
var handlebars = require('handlebars');
//var fs = require('fs');
var path = require('path');
var engines = require('consolidate');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
//var viewPath = path.join(__dirname, 'views');
//app.set('views', viewPath);
//app.set('view engine', 'html');

app.get('/check/me', function (req, res) {
  res.render('checkme.html');
});
app.get('/', function (req, res) {
  res.render('index.html');
});




app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
