const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();


const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("welcome to my hotel...how can i help you? we have list of menu");
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
