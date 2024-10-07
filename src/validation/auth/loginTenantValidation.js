const Joi = require("joi")

const schema = Joi.object({
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
  password: Joi.string().required().messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required.",
  }),
  role: Joi.string().min(1).max(50).required().messages({
    "string.empty": "Role cannot be empty",
    "any.required": "Role is required.",
  }),
})

module.exports = schema

