var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);
console.log("Server started, listening on port 3000...");

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/home.html');
});

io.on('connection', function (socket) {
    console.log("New connection");

    socket.emit('Welcome', {data: "Connected."});

    socket.on('join', function (data) {
        console.log(data);
    });
});