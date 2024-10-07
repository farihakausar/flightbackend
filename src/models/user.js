const { boolean } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
    },
    profileImage: {
      type: String,
      default: "",
    },
    birthday: {
      type: String,
    },
    gender: {
      type: String,
    },
    isBusiness: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "users", strict: false, timestamps: true }
);

const Users = mongoose.model("users", userSchema);

module.exports = {
  Users,
};
