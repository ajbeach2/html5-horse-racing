var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
});