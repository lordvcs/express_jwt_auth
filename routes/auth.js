const router = require("express").Router();
const User = require("../models/user");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async function (req, res) {
  // Data validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // Ensure email doesnt already exist
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(400).json("User with that email already exists");

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: passwordHash,
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async function (req, res) {
  // Data validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // Ensure email doesnt already exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("User with that email doesnt exist");

  const validPass = bcrypt.compareSync(req.body.password, user.password);
  if (!validPass) return res.status(400).json("Wrong password");

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "180 days",
  });
  res.header("JWT_TOKEN", token).send(token);
});

module.exports = router;
