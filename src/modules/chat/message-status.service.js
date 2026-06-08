const Message = require("./message.modal");

class MessageStatusService {

  static async markDelivered(messageId) {

    return await Message.findByIdAndUpdate(
      messageId,
      {
        status: "DELIVERED",
        deliveredAt: new Date()
      },
      {
        new: true
      }
    );
  }

  static async markSeen(
    messageId,
    userId
  ) {

    return await Message.findByIdAndUpdate(
      messageId,
      {
        status: "SEEN",
        seenAt: new Date(),

        $addToSet: {
          seenBy: userId
        }
      },
      {
        new: true
      }
    );
  }
}

module.exports =
  MessageStatusService;