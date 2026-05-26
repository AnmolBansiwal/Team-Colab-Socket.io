const onlineUsers = require("../store/onlineUsers.js");

const presenceHandler = (io, socket) => {

  const userId = socket.user._id.toString();

  // SAVE ONLINE USER
  onlineUsers.set(userId, socket.id);

  console.log("ONLINE USERS:", onlineUsers);

  // BROADCAST ONLINE USERS
  io.emit(
    "presence:online-users",
    Array.from(onlineUsers.keys())
  );

  // DISCONNECT
  socket.on("disconnect", () => {

    onlineUsers.delete(userId);

    console.log(`User disconnected: ${userId}`);

    io.emit(
      "presence:online-users",
      Array.from(onlineUsers.keys())
    );
  });
};

module.exports = presenceHandler;