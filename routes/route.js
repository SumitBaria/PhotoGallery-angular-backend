const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Photos = require("../models/photos");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { response } = require("express");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } 
  catch(err) {
    res.send("error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const aliens = photos.findById(req.params.id);
    res.json(aliens);
  } 
  catch (err) {
    res.send("error", err);
  }
});

router.post("/", async (req, res) => {
  const utemp = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_id: req.body.email_id,
    password: req.body.password,
  });
  User.find({ email_id : req.body.email_id })
  .then(resp=>{
    if(resp.length != 0){
      return res.json({
        data:[],
        success:false,
        msg:"Email id already exits !!"
      })
    }
    else{
      const u1 = utemp.save();
      res.json({
        data:u1,
        success:true,
        msg:"Registration successfully completed !!"
      })
    }
  })
  .catch(err=>{
    res.json({
      data:[],
      success:false,
      msg:"Something went wrong !!"
    })
  })
});

router.post("/auth", async (req, res) => {
  User.find({
    email_id: req.body.email_id,
    password: req.body.password
  })
  .then(response=>{
    if(response.length != 0){
      res.json({
        data:[],
        success:true,
        msg: "User logs in !!"
      });
    }
    else{
      res.json({
        data:[],
        success:false,
        msg: "Invalid id or password !!"
      });        
    }    
  })
  .catch(err=>{
    res.json({
      data:[],
      success:false,
      msg: "Something went wrong !!"
    });   
  })
});

router.delete("/:id", async (req, res) => {
  try {
    const a1 = await User.findByIdAndDelete(req.params.id);
    res.json(a1);
  } catch (err) {
    res.send("error ocuured ");
  }
});
router.put("/:id", async (req, res) => {
  try {
    const a1 = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.json(a1);
  } catch (err) {
    res.send("error ocuured ");
  }
});

router.get("/:user_id/image", async (req, res) => {
  try {
    const photos = await Photos.find({ user_id: req.params.user_id });
    res.json(photos);
  } catch (err) {
    res.send("err " + err);
  }
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("./assets"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now().toString() + "-" + req.params.user_id + "-" + file.originalname
    );
  },
});

const upload = multer({ storage: storage });

router.post("/:user_id/image", upload.single("image"), async (req, res) => {
  const image = new Photos({
    name: req.file.filename,
    caption: req.body.caption,
    user_id: req.params.user_id,
  });

  try {
    const photos = await image.save();
    res.json(photos);
  } catch (err) {
    res.send("err " + err);
  }
});

router.delete("/:user_id/image/:photo_id", async (req, res) => {
  try {
    const photoObj = await Photos.findById(req.params.photo_id);
    fs.unlinkSync("./assets/" + photoObj.name);
    photoObj.delete();
    res.send("deleted " + photoObj.name);
  } catch (err) {
    res.send("error ocuured " + err);
  }
});

module.exports = router;
