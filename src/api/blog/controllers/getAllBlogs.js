const { blog } = require("../../../models/blog");

const getAllBlogs = async (req, res) => {
  try {
    const { category } = req.query;

    // Define a filter object
    let filter = {};

    // If category is provided, add it to the filter (case-insensitive)
    if (category) {
      filter.category = { $regex: new RegExp(category, "i") }; // "i" makes it case-insensitive
    }

    // Fetch blogs based on the filter
    const blogs = await blog.find(filter);

    // Respond with the fetched blogs
    res.status(200).json({
      message: "Blogs fetched successfully!",
      blogs,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

module.exports = {
  getAllBlogs,
};
