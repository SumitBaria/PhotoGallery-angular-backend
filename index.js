const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const url = "mongodb://localhost/PhotoGallery";
const app = express();

const cors = require("CORS");

app.use(cors());

mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false });
const con = mongoose.connection;

con.on("open", () => {
  console.log("Database Connected...");
});

app.use(express.json());
app.use(bodyParser.json());

const userRouter = require("./routes/route");
app.use("/home", userRouter);

app.listen(9000, () => {
  console.log("Server Started.....");
});
