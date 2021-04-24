const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
  },
});

module.exports = mongoose.model("photos", photoSchema);
