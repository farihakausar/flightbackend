const express = require("express");

const { login } = require("./controllers/login");
const { changePassword } = require("./controllers/changePassword");

const { sendVerifyEmail } = require("./controllers/sendVerifyEmail");
const { updateForgotPassword } = require("./controllers/updateForgotPassword");
const { signup } = require("./controllers/signup");
const { editProfile } = require("./controllers/editProfile");
const { deleteAccount } = require("./controllers/deleteAccount");
const { verifyForgotOtp } = require("./controllers/verifyForgotOtp");
const router = express.Router();

router.post("/login", login);
router.post("/verify-otp", verifyForgotOtp);
router.patch("/password/update", changePassword);
router.delete("/deleAccount", deleteAccount);
router.patch("/account", editProfile);
router.post("/signup", signup);
router.post("/verify-email", sendVerifyEmail);
router.patch("/update/password", updateForgotPassword);

module.exports = router;
