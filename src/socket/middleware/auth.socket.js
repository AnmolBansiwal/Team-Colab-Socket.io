const jwt= require("jsonwebtoken");
const User= require("../../modules/users/user.model");

const socketAuthMiddleware = async(socket, next)=>{
    try{
        const token= socket.handshake.auth.token;
        if(!token){
            return next(new Error("Authentication error: Token not provided")); 
        }
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user){
            return next(new Error("user not found"));
        }
        socket.user= user;
        next();
    }
    catch(err){
        next(new Error("unauthorized"));
    }
}
module.exports= socketAuthMiddleware ;