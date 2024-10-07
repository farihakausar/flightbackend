const { blog } = require("../../../models/blog");
const { comment } = require("../../../models/comment");

const commentOnBlog = async (req, res) => {
  try {
    // Extract blog ID and comment data from request body
    const { blogId, userId, content } = req.body;

    // Validate the blog ID and content
    if (!blogId || !content) {
      return res
        .status(400)
        .json({ message: "Blog ID and content are required" });
    }

    // Create a new comment document
    const newComment = new comment({
      userId,
      content,
    });

    // Save the new comment to the database
    await newComment.save();

    // Find the blog post and add the comment to the blog's comments array
    const updatedBlog = await blog
      .findByIdAndUpdate(
        blogId,
        { $push: { comments: newComment._id } }, // Add comment ID to blog
        { new: true } // Return the updated blog
      )
      .populate("comments"); // Optional: to populate the comments after update

    // If the blog post does not exist
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // Return success response with the updated blog
    res.status(200).json({
      message: "Comment added successfully!",
      blog: updatedBlog,
      comment: newComment,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: "Error adding comment to blog post",
      error,
    });
  }
};

module.exports = {
  commentOnBlog,
};
