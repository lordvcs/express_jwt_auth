const router = require("express").Router();
const User = require("../models/user");
const Joi = require("@hapi/joi");

// JOI validation
const userValidationSchema = {
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(4).required(),
};

router.post("/register", async function (req, res) {
  const { error } = Joi.ValidationError(req.body, userValidationSchema);
  if (error) res.status(400).send(error.details[0].message);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
