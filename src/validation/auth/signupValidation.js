const Joi = require("joi")

const schema = Joi.object({
  userName: Joi.string().min(1).max(50).required().messages({
    "string.empty": "Username cannot be empty",
    "any.required": "Username is required.",
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
  agencyName: Joi.string().min(1).max(50).required().messages({
    "string.empty": "Agency Name cannot be empty",
    "any.required": "Agency Name is required.",
  }),
  IDNumber: Joi.number().min(1).required().messages({
    "number.empty": "ID Number cannot be empty",
    "any.required": "ID Number is required.",
  }),
  contact: Joi.string().min(1).max(50).required().messages({
    "string.empty": "Contact cannot be empty",
    "any.required": "Contact is required.",
  }),
  role: Joi.string().min(1).max(50).required().messages({
    "string.empty": "Role cannot be empty",
    "any.required": "Role is required.",
  }),
})

module.exports = schema
