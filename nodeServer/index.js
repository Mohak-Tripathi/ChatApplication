

//nodeServer which will handle socket.io connections

const io = require("socket.io")(8085); // i need socket-io at 8000  port.

// Now, I want to run socket.io i.e. the instance of http-

const users = {};

io.on("connection", (socket) => {
    //whenever new user join, tell everybody except that user. 
  socket.on("new-user-joined", (name) => {
    // console.log("New User", name);

    users[socket.id] = name; // updating the users
    socket.broadcast.emit("user-joined", name);
  });


//when user send the msg, broadcast the message to everybody. 
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name1: users[socket.id],
    });
  });


//when user left the msg, broadcast the message to everybody. 
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id]
  });

  //Note- new-user-joined", "send", "receive", "user-joined" are custom names made by me only.
  // connection and disconnect are inbuilt 
});
