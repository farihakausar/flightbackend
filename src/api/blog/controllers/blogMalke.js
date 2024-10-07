const { blog } = require("../../../models/blog");

const blogMalke = async (req, res) => {
  try {
    const {
      title,
      writtenBy,
      date,
      topic,
      description,
      images,
      comments,
      category,
    } = req.body;

    const newBlog = new blog({
      title,
      writtenBy,
      date,
      category,
      topic,
      description,
      images,
      comments,
    });

    await newBlog.save();

    res.status(201).json({
      message: "Blog post created successfully!",
      blog: newBlog,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog post", error });
  }
};

module.exports = {
  blogMalke,
};
