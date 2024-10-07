const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Users } = require("../../../models/user"); // Adjust the path based on your project structure

const editProfile = async (req, res) => {
  try {
    const {
      _id,
      firstName,
      lastName,
      email,
      profileImage,
      birthday,
      gender,
      password,
    } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "User ID is required.",
        success: false,
      });
    }

    // Find the user by ID
    const user = await Users.findById(_id);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Update profile fields if they exist in the request body
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) {
      const emailExists = await Users.findOne({ email });
      if (emailExists && emailExists._id.toString() !== _id) {
        return res.status(409).json({
          message: "This email is already registered by another user.",
          success: false,
        });
      }
      user.email = email.toLowerCase();
    }
    if (profileImage) user.profileImage = profileImage;
    if (birthday) user.birthday = birthday;
    if (gender) user.gender = gender;

    // If password is provided, hash it and update
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
    }

    // Save the updated user data
    await user.save();

    // Return success response
    res.json({
      success: true,
      message: "Profile updated successfully!",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage,
        birthday: user.birthday,
        gender: user.gender,
      },
    });
  } catch (error) {
    const message = error.message || "We are working to fix this problem.";
    res.status(500).json({
      message,
      success: false,
    });
  }
};

module.exports = {
  editProfile,
};
