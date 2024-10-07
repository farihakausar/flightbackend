const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secKey } = require("../../../libs/exports");
const { Users } = require("../../../models/user");

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingEmail = await Users.findOne({ email: email });
    if (existingEmail) {
      return res.status(409).json({
        message: "This email is already registered.",
        success: false,
        user: null,
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    // Create new user object with hashed password
    const newUser = new Users({
     
      password: hash,
      firstName,
      lastName,
      email,
      password,
    });

    // Save user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { _id: newUser._id.toString(), role: newUser.role },
      secKey
    );

    // Prepare response object, excluding password
    const localUser = newUser.toJSON();
    delete localUser.password;
    localUser.token = token;

    // Send success response with token and user data
    res.json({
      success: true,
      message: "Signed up successfully!",
      user: localUser,
    });
  } catch (error) {
    // Handle any errors
    const message = error.message || "We are working to fix this problem";
    res.status(500).json({ message, user: null, success: false });
  }
};

module.exports = {
  signup,
};
