// express js is the intermediary that sits between client 
// and server to intercept the request and modify
// the response from the server

const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlware/errorHandler");
const path = require('path');
contactRoutes = require("./routes/contactRoutes")
userRoutes = require("./routes/userRoutes")

const express = require("express");
const { env } = require("process");
const app = express()
const port = 3000
connectDb();



app.use(express.json()) // Used to parse the req
app.use('/api/contacts', contactRoutes) //middleware
app.use('/api/users', userRoutes) //middleware
app.use(errorHandler)//Middle ware

app.listen(3000, function () {
    console.log("Express server listening on port 3000");
});

// 01:19:25