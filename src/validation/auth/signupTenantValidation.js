const Joi = require("joi")

const schema = Joi.object({
  firstName: Joi.string().min(1).max(50).required().messages({
    "string.empty": "First Name cannot be empty",
    "any.required": "First Name is required.",
  }),
  lastName: Joi.string().min(1).max(50).required().messages({
    "string.empty": "Last Name cannot be empty",
    "any.required": "Last Name is required.",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "one"] },
    })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "any.required": "Email is required.",
    }),
  password: Joi.string()
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
    .messages({
      "string.empty": "Password cannot be empty",
      "any.required": "Password is required.",
    }),
  contact: Joi.string().min(1).max(100).required().messages({
    "string.empty": "Contact cannot be empty",
    "any.required": "Contact is required.",
  }),
  role: Joi.string().min(1).max(50).required().messages({
    "string.empty": "Role cannot be empty",
    "any.required": "Role is required.",
  }),
})

module.exports = schema
