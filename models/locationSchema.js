const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  userId: {
    type: String,
  
    required: true,
  },
  title: {
    type: String,
    required: [true, "Please add a title"]
  },
  adress: {
    type: String,
    required: [true, "Please add an adress"],
  },

  coordinates: {
    type: Array,
    required: true,
  },

  formattedAdress: String,

  description: {
    type: String,
    required: [true, "Please add a short description"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Location", LocationSchema);
