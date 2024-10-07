const bcrypt = require("bcrypt");
const { Users } = require("../../../models/user");
const updateForgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      // Validation failed
      return res.status(400).json({
        message: "Please provide a valid registered email.",
        success: false,
      });
    }

    if (password?.length < 6) {
      // Validation failed
      return res.status(400).json({
        message: "Please provide a minimum 6 characters long password.",
        success: false,
      });
    }

    let user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this email",
        user: null,
      });
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    user.password = hash;
    await user.save();
    res.json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    const message = error.message || "We are working to fix this problem";
    res.status(500).json({
      message,
      success: false,
    });
  }
};

module.exports = {
  updateForgotPassword,
};
