var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
 // res.sendFile('index.html');
 res.send(_dirname);
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(process.env.PORT||5000, function(){
  console.log('listening on *:3000');
});