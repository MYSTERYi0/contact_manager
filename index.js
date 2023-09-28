const express = require("express");
const app = express()
const path = require('path')
const port = 3000

// app.use(req,res, next) {

// }
app.use(logger)
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/contacts', (req, res) => {
    res.status(200).json("Get all Contacts")
});

app.listen(3000, function () {
    console.log("Express server listening on port 3000");
});