const Joi = require("@hapi/joi");

// JOI register validation
const registerValidation = (data) => {
  const userValidationSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(4).required(),
  });
  return userValidationSchema.validate(data);
};
// JOI login validation
const loginValidation = (data) => {
  const userValidationSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(4).required(),
  });
  return userValidationSchema.validate(data);
};

module.exports = { registerValidation, loginValidation };
