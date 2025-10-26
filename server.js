const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const person=require("./models/person");

const passport = require('./auth');

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body
app.use(express.json());


const PORT = process.env.PORT || 3000;

//Midddleware Function
const logRequest = (req,res,next)=>{
    console.log(`${new Date().toLocaleString()}Request Made to : ${req.originalUrl}`);
    next();//Move to the next phase
}

// Middleware (move it here)
app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session : false});

app.get("/", (req, res) => {
  res.send("welcome to my hotel...how can i help you?");
});

//Import the router files
const personRoutes= require("./routes/personRoutes");

const menuRoutes= require("./routes/menuRoutes");

//use the routers
app.use("/person",personRoutes);
app.use("/menu",menuRoutes);

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
