const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Users } = require("../../../models/user");

const deleteAccount = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Check if userId and password are provided
    if (!userId || !password) {
      return res.status(400).json({
        message: 'Please provide "userId" and "password".',
        success: false,
      });
    }

    // Convert userId to Mongoose ObjectId and find the user
    const convertedId = new mongoose.Types.ObjectId(userId);
    const user = await Users.findById(convertedId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this ID.",
        user: null,
      });
    }

    // Compare the provided password with the stored password
    const passCheck = await bcrypt.compare(password, user.password);

    if (!passCheck) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password. Unable to delete account.",
        user: null,
      });
    }

    // Delete the user account
    await Users.findByIdAndDelete(userId);

    // Send success response
    res.json({
      success: true,
      message: "Account deleted successfully.",
    });
  } catch (error) {
    const message = error.message || "We are working to fix this problem.";
    res.status(500).json({ message, user: null, success: false });
  }
};

module.exports = {
  deleteAccount,
};
