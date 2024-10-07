const { Users } = require("../../../models/user");
const verifyForgotOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      // Validation failed
      return res.status(400).json({
        message: "Please provide a valid email and OTP.",
        success: false,
      });
    }

    let landlord = await Users.findOne({ email });

    if (!landlord) {
      return res.status(404).json({
        success: false,
        message: "No landlord found with this email",
        landlord: null,
      });
    }
    if (landlord.forgotOtp !== otp) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP. Authentication failed.",
        landlord: null,
      });
    }
    await landlord.updateOne({ $unset: { forgotOtp: 1 } });
    res.json({
      success: true,
      message: "OK",
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
  verifyForgotOtp,
};