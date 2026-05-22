const express = require("express");
const cors= require("cors");
const app= express();
const authRoute= require('./modules/auth/auth.routes');
app.use(express.json());
app.use(cors());
app.use('/api/auth',authRoute);
module.exports= app;