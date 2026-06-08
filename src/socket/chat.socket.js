const MessageService= require("../modules/chat/message.service");
const MessageStatusService= require("../modules/chat/message-status.service")
const chatHandler = (io, socket) => {

  // JOIN CHAT
  socket.on("chat:join", (chatId, callback) => {
    console.log("chat:join received", {
      userId: socket.user?._id,
      chatId
    });

    if (!chatId) {
      if (typeof callback === "function") {
        callback({
          success: false,
          error: "chatId is required"
        });
      }
      return;
    }

    socket.join(chatId);

    if (typeof callback === "function") {
      callback({
        success: true,
        room: chatId
      });
    }
  });

  // TYPING
  socket.on("chat:typing", (chatId) => {
    socket.to(chatId).emit("chat:typing", {
      userId: socket.user._id,
      name: socket.user.name
    });
  });

  // STOP TYPING
  socket.on("chat:stop-typing", (chatId) => {
    socket.to(chatId).emit("chat:stop-typing", {
      userId: socket.user._id
    });
  });

  // SEND MESSAGE
  socket.on("chat:message", async (data, callback) => {
    try {
      const message =
        await MessageService.createMessage({
          sender: socket.user._id,
          chatId: data.chatId,
          content: data.content
        });

      const deliveredMessage =
        await MessageStatusService.markDelivered(
          message._id
        );

      io.to(data.chatId).emit(
        "chat:message",
        deliveredMessage
      );

      io.to(data.chatId).emit(
        "chat:status-updated",
        {
          messageId: deliveredMessage._id,
          status: deliveredMessage.status
        }
      );

      if (typeof callback === "function") {
  callback({
    success: true,
    message
  });
}

    } catch (err) {
     if (typeof callback === "function") {
  callback({
    success: false,
    error: err.message
  });
}
    }
  });

  // SEEN MESSAGE
  socket.on(
    "chat:seen",
    async ({ messageId }) => {
      try {

        const updatedMessage =
          await MessageStatusService.markSeen(
            messageId,
            socket.user._id
          );

        io.to(
          updatedMessage.chat.toString()
        ).emit(
          "chat:seen",
          {
            messageId,
            userId: socket.user._id,
            status: "SEEN"
          }
        );

      } catch (err) {
        console.error(err);
      }
    }
  );

};

module.exports = chatHandler;