const MessageService = require(
  "../modules/chat/message.service"
);

const chatHandler = (io, socket) => {

  // JOIN CHAT
  socket.on("chat:join", (chatId) => {

    socket.join(chatId);

    console.log(
      `${socket.user.name} joined ${chatId}`
    );
  });

  // TYPING
  socket.on("chat:typing", (chatId) => {

    socket.to(chatId).emit(
      "chat:typing",
      {
        userId: socket.user._id,
        name: socket.user.name
      }
    );
  });

  // STOP TYPING
  socket.on("chat:stop-typing", (chatId) => {

    socket.to(chatId).emit(
      "chat:stop-typing",
      {
        userId: socket.user._id
      }
    );
  });

  // SEND MESSAGE
  socket.on(
    "chat:message",
    async (data, callback) => {

      try {

        // SAVE MESSAGE
        const message =
          await MessageService.createMessage({
            sender: socket.user._id,
            chatId: data.chatId,
            content: data.content
          });

        // BROADCAST
        io.to(data.chatId).emit(
          "chat:message",
          message
        );

        // ACKNOWLEDGEMENT
        callback({
          success: true,
          message
        });

      } catch (err) {

        callback({
          success: false,
          error: err.message
        });
      }
    }
  );
};

module.exports = chatHandler;