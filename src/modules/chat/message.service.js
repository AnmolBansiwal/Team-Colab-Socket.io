const Message= require("./message.modal");
const Chat = require("./chat.model");

class MessageServices{
    static async createMessage(data){
        const message= await Message.create({
            sender: data.sender,
            chat: data.chatId,
            content: data.content,
            seenBY: [data.sender]
        });
        await Chat.findByIdAndUpdate(
            data.chatId,
            {
                lastMessage: message._id
            }
        );
        return await Message.findById(message._id)
        .populate("Sender", "name email")
        .populate("chat");
    }

    static async getChatMessage(chatId){
        return await message.find({
            chat: chatId
        })
        .populate("sender", "name email")
      .sort({ createdAt: 1 });
    }
}
module.exports= MessageServices;