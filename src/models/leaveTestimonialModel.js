const mongoose = require("mongoose");

const leaveTestimonialSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  message: {
    type: String,
  },
  rating: {
    type: Number,

    min: 1,
    max: 5,
  },
});

const leaveTestimonial = mongoose.model(
  "leaveTestimonial",
  leaveTestimonialSchema
);

module.exports = {
  leaveTestimonial,
};
