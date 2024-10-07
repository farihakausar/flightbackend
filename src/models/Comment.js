const mongoose = require("mongoose");

// Define the Comment schema
const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Optional: Link to the house
    },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Create the Comment model
const comment = mongoose.model("Comment", commentSchema);

module.exports = {
  comment,
};
