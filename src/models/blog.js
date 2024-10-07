const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String },
    writtenBy: { type: String },
    date: { type: Date, default: Date.now },
    topic: { type: String },
    description: { type: String },
    category: { type: String },
    images: { type: [String] },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { collection: "blog", timestamps: true }
);

const blog = mongoose.model("blog", blogSchema);

module.exports = {
  blog,
};
