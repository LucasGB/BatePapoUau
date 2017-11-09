var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

server.listen(3000);
console.log("Server started, listening on port 3000...");

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/home.html');
});

app.get('/:id', function (req, res) {
	res.sendFile(__dirname + '/public/room.html');
});

io.on('connection', function (socket) {
    console.log("New connection");

    socket.on('join_room', function (room) {
      //socket.room = ""+room;
  		socket.join(room);
  		console.log('User joined room #'+room);
      console.log(socket.rooms);
    });

    socket.on('message', function (message) {
      console.log('received message ' + message.message);

      io.sockets.in(message.room).emit('message', message);
      //console.log(socket.rooms);
    });

    socket.on('disconnect', function (data) { 
    	console.log('User disconnected.');
    });

});