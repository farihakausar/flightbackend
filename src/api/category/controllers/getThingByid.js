const { businessProfile } = require("../../../models/businessProfile");

const getThingByid = async (req, res) => {
  try {
    // Extract the businessProfile ID from the request parameters
    const { id } = req.params;

    // Find the businessProfile post by its ID
    const foundbusinessProfile = await businessProfile.findById(id);

    // If the businessProfile post does not exist, return a 404 response
    if (!foundbusinessProfile) {
      return res.status(404).json({
        message: "businessProfile post not found",
      });
    }

    // If the businessProfile post exists, return it in the response
    res.status(200).json({
      message: "businessProfile post fetched successfully",
      businessProfile: foundbusinessProfile,
    });
  } catch (error) {
    // Handle errors, such as invalid ID format or database errors
    res.status(500).json({
      message: "Error fetching the businessProfile post",
      error,
    });
  }
};

module.exports = {
  getThingByid,
};
