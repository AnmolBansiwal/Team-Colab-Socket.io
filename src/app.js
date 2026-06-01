const express = require("express");
const cors= require("cors");
const app= express();
const chatRoutes = require("./modules/chat/chat.routes")
const authRoute= require('./modules/auth/auth.routes');
app.use(express.json());
app.use(cors());
app.use('/api/auth',authRoute);
app.use('/api/chat', chatRoutes);
module.exports= app;