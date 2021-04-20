const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost/PhotoGallery";
const app = express();

var bodyParser = require('body-parser');
 
var fs = require('fs');
var path = require('path');
require('dotenv/config');

mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false });
const con = mongoose.connection;

con.on("open", () => {
  console.log("Database Connected...");
});

// Step 3 - code was added to ./models.js
 
// Step 4 - set up EJS
 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
// Set EJS as templating engine
app.set("view engine", "ejs");
app.use(express.json());

const userRouter = require("./routes/route");
app.use("/home", userRouter);

app.listen(9000, () => {
  console.log("Server Started.....");
});
