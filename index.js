const express = require('express')
const app = express()

var server = require('http')
  .Server(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 3333, () => console.log(`started on port ${process.env.PORT || 3333}`));

app.use(express.static("./assets"))

app.get('/sockets', function (req, res) {
  const sockets = Object.keys(io.sockets.sockets)
    .map(id => id)
  console.log(sockets)
  res.send(sockets)
})

const sockets = Object.keys(io.sockets.sockets)
  .map(id => id)

io.on('connection', function (socket) {
  // ask for identification
  console.log("connection success", socket.id)
  // io.sockets.sockets.emit("auth", {
  //   frm,
  //   time,
  //   target,
  //   message
  // })
  socket.emit('auth')
  socket.on('auth', function (data) {
    console.log(data)
    // process this token and fetch the users details from the db and emit it to them
    socket.emit('user_details', {
      id: '123456',
      first_name: "first_name",
      middle_name: "middle_name",
      last_name: "middle_name",
      pic: "cool url here",
      settings: {
        theme: "green"
      },
      status: "i love life"
    })
  })

  socket.on('login', function (data) {
    socket.emit('login', {
      token: '123456'
    })
  })

  socket.on('register', function (data) {
    socket.emit('register', {
      token: '123456'
    })
  })

  socket.on('forgotPass', function (data) {
    socket.emit('forgotPass', {
      message: 'Emails should be on their way now'
    })
  })

  socket.on('get_contacts', function () {
    socket.emit('get_contacts', [{
      id: '1',
      full_name: "first_name",
      last_message: {
        time: "108",
        content: "awesomnes"
      },
      pic: "https://www.communitylandtrust.ca/wp-content/uploads/2015/10/placeholder.png",
      thread: [{
        id: '123456',
        type: "text",
        content: "hey this is so cool"
      }, {
        id: '1234567',
        type: "text",
        content: "hey this is so cool"
      }]
    }, {
      id: '2',
      full_name: "first_name",
      last_message: {
        time: "108",
        content: "awesomnes"
      },
      pic: "https://www.communitylandtrust.ca/wp-content/uploads/2015/10/placeholder.png",
      thread: [{
        id: '123456',
        type: "text",
        content: "hey this is so cool"
      }, {
        id: '1234567',
        type: "text",
        content: "hey this is so cool"
      }]
    }, {
      id: '3',
      full_name: "first_name",
      last_message: {
        time: "108",
        content: "awesomnes"
      },
      pic: "https://www.communitylandtrust.ca/wp-content/uploads/2015/10/placeholder.png",
      thread: [{
        id: '123456',
        type: "text",
        content: "hey this is so cool"
      }, {
        id: '1234567',
        type: "text",
        content: "hey this is so cool"
      }]
    }])
  })

  socket.on('sendMessage', function (data) {
    const {
      frm,
      time,
      target,
      message
    } = data
    io.sockets.sockets[target].emit("newMessage", {
      frm,
      time,
      target,
      message
    })
  });
  socket.on('giveMeSockets', function (data) {
    io.sockets.sockets[socket.id]
      .emit("giveYouSockets", Object.keys(io.sockets.sockets)
        .map(id => id)
        .filter(s => socket.id !== s))
  })
});
