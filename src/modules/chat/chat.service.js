const chat= require("./chat.model");
class chatService{
    static async createPrivateChat(user1,user2){
    let existingChat = await chat.findOne({
        isGroupChat: false,
        participants: {
            $all: [user1, user2]
        }
    });
    if(existingChat){
        return existingChat;
    }
    const newChat= await chat.create({
        participants: [user1, user2]
    });
    return newChat;
}
}
module.exports = chatService; 