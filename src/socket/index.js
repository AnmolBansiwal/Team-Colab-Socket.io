const socketAuthMiddleware= require("./middleware/auth.socket");
const presenceHandler= require("./middleware/presence.socket");
const chatHandler= require("./chat.socket");
const { connection } = require("mongoose");
const initializeSocket= (io)=>{
    //socket auth
    console.log("socketAuthMiddleware:", typeof socketAuthMiddleware);
console.log("presenceHandler:", typeof presenceHandler);
console.log("chatHandler:", typeof chatHandler);
    io.use(socketAuthMiddleware);
    io.on("connection",(socket)=>{
        console.log(`user connected: ${socket.user.name}`
       );
       // Personal room
       socket.join(socket.user._id.toString());
       //Handlers
       presenceHandler(io,socket);
       chatHandler(io,socket);
    });
};
module.exports= initializeSocket;