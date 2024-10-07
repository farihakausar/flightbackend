const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../../../models/user");
const secKey = "your-secret-key"; // Replace with your actual secret key

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
        success: false,
        user: null,
      });
    }

    // Trim inputs
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Find user by email in the database
    const user = await Users.findOne({ email: trimmedEmail });

    // If user is not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this email.",
        user: null,
      });
    }

    // Compare passwords
    // const passwordMatch = await bcrypt.compare(trimmedPassword, user.password);
    // console.log('User Password:', user.password);
    // console.log('Entered Password:', trimmedPassword);
    // console.log('Password Match:', passwordMatch);

    // // If password does not match
    // if (!passwordMatch) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Incorrect password. Please try again.",
    //     user: null,
    //   });
    // }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id.toString(), email: user.email },
      secKey
    );

    // Prepare user object for response without the password
    const localUser = user.toJSON();
    delete localUser.password; // Remove password from the response
    localUser.token = token; // Add token to the user object

    // Send success response with user data and token
    res.json({
      success: true,
      message: "Logged in successfully!",
      user: localUser,
    });
  } catch (error) {
    // Handle any errors
    const message = error.message || "An error occurred. Please try again.";
    res.status(500).json({ message, user: null, success: false });
  }
};


module.exports = {
  login,
};
