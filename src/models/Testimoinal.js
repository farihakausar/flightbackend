const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
  testimonials: [
    { type: mongoose.Schema.Types.ObjectId, ref: "leaveTestimonial" },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Testimoinal = mongoose.model("testimonial", testimonialSchema);

module.exports = {
  Testimoinal,
};
