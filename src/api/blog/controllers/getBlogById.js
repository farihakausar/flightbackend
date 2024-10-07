const { blog } = require("../../../models/blog");

const getBlogById = async (req, res) => {
  try {
    // Extract the blog ID from the request parameters
    const { id } = req.params;

    // Find the blog post by its ID
    const foundBlog = await blog.findById(id);

    // If the blog post does not exist, return a 404 response
    if (!foundBlog) {
      return res.status(404).json({
        message: "Blog post not found",
      });
    }

    // If the blog post exists, return it in the response
    res.status(200).json({
      message: "Blog post fetched successfully",
      blog: foundBlog,
    });
  } catch (error) {
    // Handle errors, such as invalid ID format or database errors
    res.status(500).json({
      message: "Error fetching the blog post",
      error,
    });
  }
};

module.exports = {
  getBlogById,
};
