const express = require('express')
const app = express()

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 3333);

app.use(express.static("./assets"))

app.get('/sockets', function (req, res) {
    const sockets = Object.keys(io.sockets.sockets).map(id => id)
    console.log(sockets)
    res.send(sockets)
})

const sockets = Object.keys(io.sockets.sockets).map(id => id)

io.on('connection', function (socket) {
    socket.on('sendMessage', function (data) {
        const { frm,time, target, message } = data
        io.sockets.sockets[target].emit("newMessage",{ frm, time, target, message })
    });
    socket.on('giveMeSockets', function (data) {
       	io.sockets.sockets[socket.id]
       	.emit("giveYouSockets",Object.keys(io.sockets.sockets)
       		.map(id => id)
       		.filter(s=>socket.id !== s))
    })
});
