const socketAuthMiddleware = async (socket, next) => {
  try {
    console.log("HANDSHAKE AUTH:", socket.handshake.auth);

    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(
        new Error("Authentication error: Token not provided")
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = user;

    next();

  } catch (err) {
    console.log(err);
    next(new Error("Unauthorized"));
  }
};
module.exports= socketAuthMiddleware;