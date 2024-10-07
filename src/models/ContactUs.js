const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  userEmail: {
    type: String,

    trim: true,
    lowercase: true,
  },
  userName: {
    type: String,

    trim: true,
  },
  advertId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Advert", // Assuming you have an Advert model
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ContactUs = mongoose.model("ContactUs", contactUsSchema);

module.exports = ContactUs;
