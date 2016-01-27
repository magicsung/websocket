var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  console.log('get /index.html');
});
app.get('/mobile', function(req, res){
  res.sendFile(__dirname + '/mobile.html');
  console.log('get /mobile.html');
});
app.get('/img/rotate.png', function(req, res){
  res.sendFile(__dirname + '/img/rotate.png');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('io.emit='+msg);
  });
  socket.on('ask_channel', function(msg){
    io.emit('ask_channel', msg);
    console.log('ask_channel='+msg);
  });
  socket.on('answer_channel', function(msg){
    io.emit('answer_channel', msg);
    console.log('answer_channel='+msg);
  });
  socket.on('linked', function(msg){
    io.emit(msg.room, msg);
    console.log('linked='+msg.room);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
