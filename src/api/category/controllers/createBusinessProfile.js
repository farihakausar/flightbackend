const { businessProfile } = require("../../../models/businessProfile"); // Adjust the path as necessary

const createBusinessProfile = async (req, res) => {
  try {
    // Extract data from request body
    const {
      businessName,
      type,
      primaryService,
      email,
      phone,
      businessLogo,
      mainLocation,
      operation,
      description,
      profileSubtitle,
      youtubeVideo,
      timeAvailable,
      approachCustomers,
      stock,
      status,
      userId,
      paymentMethodsAccepted,
    } = req.body;

    // Validate required fields
    if (
      !businessName ||
      !type ||
      !primaryService ||
      !email ||
      !phone ||
      !operation ||
      !approachCustomers
    ) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    // Create a new business profile instance
    const newBusinessProfile = new businessProfile({
      businessName,
      type, // The new 'type' field is required
      primaryService,
      email,
      phone,
      businessLogo,
      mainLocation,
      operation,
      description,
      profileSubtitle,
      youtubeVideo,
      timeAvailable,
      approachCustomers,
      stock,
      paymentMethodsAccepted,
      user: userId, // Associate the profile with the user who is creating it
      status: status,
    });

    // Save the business profile to the database
    await newBusinessProfile.save();

    // Respond to the client
    res.status(201).json({
      message: "Business profile created successfully!",
      profile: newBusinessProfile,
    });
  } catch (error) {
    console.error("Error creating business profile:", error);
    res.status(500).json({
      error: "An error occurred while creating the business profile.",
    });
  }
};

module.exports = {
  createBusinessProfile,
};
