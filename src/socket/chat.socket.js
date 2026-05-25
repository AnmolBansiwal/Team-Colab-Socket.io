const chatHandler = (io, socket) => {

  // JOIN CHAT ROOM
  socket.on("chat:join", (chatId) => {

    socket.join(chatId);

    console.log(
      `${socket.user.name} joined room ${chatId}`
    );
  });

  // SEND MESSAGE
  socket.on("chat:message", (data) => {

    const payload = {
      sender: {
        id: socket.user._id,
        name: socket.user.name
      },

      message: data.message,
      chatId: data.chatId,

      createdAt: new Date()
    };

    // SEND TO ROOM
    io.to(data.chatId).emit(
      "chat:message",
      payload
    );
  });
};

module.exports = chatHandler;