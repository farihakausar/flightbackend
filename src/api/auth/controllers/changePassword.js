const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Users } = require("../../../models/user");
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword, _id } = req.body;

    // Check if all required fields are present
    if (!currentPassword || !newPassword || !confirmPassword || !_id) {
      return res.status(400).json({
        message:
          'Please provide "currentPassword", "newPassword", "confirmPassword", and "_id".',
        success: false,
      });
    }

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New password and confirm password must match.",
        success: false,
      });
    }

    // Convert _id to Mongoose ObjectId and find the user
    const convertedId = new mongoose.Types.ObjectId(_id);
    const user = await Users.findById(convertedId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this _id.",
        user: null,
      });
    }

    // Compare current password with the stored hashed password
    // const passCheck = await bcrypt.compare(currentPassword, user.password);

    // if (!passCheck) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Incorrect current password. Please try again.",
    //     user: null,
    //   });
    // }

    // Hash the new password
    const saltRounds = 10;
    const hash = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password
    user.password = hash;
    await user.save();

    // Send success response
    res.json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error) {
    const message = error.message || "We are working to fix this problem";
    res.status(500).json({ message, user: null, success: false });
  }
};

module.exports = {
  changePassword,
};
