const Joi = require("joi")

const schema = Joi.object({
  userName: Joi.string().min(1).max(50).required().messages({
    "string.empty": "User Name cannot be empty",
    "any.required": "User Name is required.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required.",
  }),
  agencyName: Joi.string().min(1).max(50).required().messages({
    "string.empty": "Agency Name cannot be empty",
    "any.required": "Agency Name is required.",
  }),
  role: Joi.string().min(1).max(50).required().messages({
    "string.empty": "Role cannot be empty",
    "any.required": "Role is required.",
  }),
})

module.exports = schema

