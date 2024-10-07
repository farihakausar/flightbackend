const { businessProfile } = require("../../../models/businessProfile"); // Adjust the path as necessary

const getAllThings = async (req, res) => {
  try {
    // Filter to get only profiles with status 'Approved'
    const filter = { status: "Approved" };

    // Fetch all matching business profiles from the database
    const profiles = await businessProfile.find(filter);

    // Check if any profiles were found
    if (profiles.length === 0) {
      return res.status(404).json({
        message: "No approved business profiles found.",
      });
    }

    // Respond with the retrieved profiles
    res.status(200).json({
      message: "Approved business profiles retrieved successfully.",
      profiles,
    });
  } catch (error) {
    console.error("Error retrieving business profiles:", error);
    res.status(500).json({
      error: "An error occurred while retrieving business profiles.",
    });
  }
};

module.exports = {
  getAllThings,
};
