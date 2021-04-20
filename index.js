const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost/PhotoGallery";
const app = express();

mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false });
const con = mongoose.connection;

con.on("open", () => {
  console.log("Database Connected...");
});

app.use(express.json());

const userRouter = require("./routes/route");
app.use("/home", userRouter);

app.listen(9000, () => {
  console.log("Server Started.....");
});
