const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Photos = require("../models/photos");
const path = require('path');
const fs = require('fs')
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.send("error", err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const aliens = await photos.findById(req.params.id);
    res.json(aliens);
  } catch (err) {
    res.send("error", err);
  }
});

router.post("/", async (req, res) => {
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_id: req.body.email_id,
    password: req.body.password,
  });
  try {
    const u1 = await user.save();
    res.json(u1);
  } catch (err) {
    res.send("error ocuured ");
  }
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


var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join("./assets"))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + "-" + req.params.user_id + "-" + file.originalname)

    }
});
 
var upload = multer({ storage: storage });



router.post("/:user_id/image",upload.single('image'), async (req, res) => {
  const image = new Photos({
    imgname: req.file.filename,
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

router.delete("/:user_id/image/:photo_id", async (req,res) => {
  try {
      const photoObj = await Photos.findById(req.params.photo_id)
      fs.unlinkSync('./assets/'+photoObj.imgname)
      photoObj.delete()
      res.send("deleted" + photoObj.imgname)
  } catch (err) {
    res.send("error ocuured ");
  }
})

module.exports = router;
