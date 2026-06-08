const jwt = require("jsonwebtoken");
const User= require("../../modules/users/user.model")
const socketAuthMiddleware = async (socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.query?.token ||
      socket.handshake.headers.authorization?.split(" ")[1] ||
      socket.handshake.headers.token;

    console.log("TOKEN:", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED:", decoded);

    const user = await User.findById(decoded.id);

    console.log("USER:", user);

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = user;

    next();

  } catch (err) {
    console.error("SOCKET AUTH ERROR:", err);
    next(err);
  }
};
module.exports= socketAuthMiddleware;