var express = require('express');
var app = express();

app.get('/check/me', function (req, res) {
  res.send('Hello World!')
});
app.get('/', function (req, res) {
  res.send('Hi There!')
});




app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
