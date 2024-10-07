
const { getOTP } = require("../../../libs/exports");
const { Users } = require("../../../models/user");
const { transporter } = require("../../../libs/transporter");

const sendVerifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("first,email", email);
    if (!email) {
      return res.status(400).json({
        message: "Please provide a valid registered email.",
        success: false,
      });
    }

    const otp = getOTP();

    let user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this email",
        user: null,
      });
    }

    const result = await Users.updateOne(
      { email: email },
      { $set: { forgotOtp: otp } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({
        success: false,
        message: "No user found with this email",
        user: null,
      });
    }

    const htmlContent = `
      <p>Your OTP is: <strong>${otp}</strong></p>
      <p>Please use this OTP to verify your email.</p>
    `;

    const mailOptions = {
      from: "Preferental, screenings@preferental.com",
      to: email,
      subject: "OTP for Forgot Password",
      html: htmlContent,
    };
    console.log("first", mailOptions);
    await transporter.sendMail(mailOptions);

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
  sendVerifyEmail,
};
