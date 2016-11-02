

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!'+process.env.PORT);
});
app.get('/login', function (req, res) {
  res.send('I will take you to Login screen!'+process.env.PORT);
});
app.get('/dashboard', function (req, res) {
  res.send('I Will take you to dashboard!'+process.env.PORT);
});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port!');
});
