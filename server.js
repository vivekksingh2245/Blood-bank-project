const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();

// Database
const db = require("./database");

// Initiate DB Connection
db.init();

let initialPath = path.join(__dirname, "public");
console.log("Intial path: ====",initialPath)
app.use(bodyparser.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(initialPath));

app.get('/',(req,res) => {
    res.sendFile(path.join(initialPath,"login.html"));
})

app.get('/login',(req,res) => {
    res.sendFile(path.join(initialPath, "login.html"));
})

app.get('/register',(req,res) => {
    res.sendFile(path.join(initialPath, "registration.html"));
})
app.get('/adminhome',(req,res) => {
    res.sendFile(path.join(initialPath, "homepage.html"));
})
app.get('/bloodbankhome',(req,res) => {
    res.sendFile(path.join(initialPath, "bloodbankhomepage.html"));
})
app.get('/donarhome',(req,res) => {
    res.sendFile(path.join(initialPath, "donarhomepage.html"));
})

//Api Routes call
//Use the users.js file for all the endpoints that start with /api/users
app.use('/api/users', require("./routes/api/users"));

//Use the bloodbanks.js file for all the endpoints that start with /api/bloodbanks
app.use('/api/bloodbanks',require("./routes/api/bloodbanks"));

//Use the donations.js file for all the endpoints that start with /api/donations
app.use('/api/donations', require("./routes/api/donations"));

app.listen(PORT, function () {
    console.log(`Server is Running on PORT :: ${PORT}`);
  });





