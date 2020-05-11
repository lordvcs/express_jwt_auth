const router = require("express").Router();
const User = require("../models/user");

router.post("/register", async function (req, res) {
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

// router.login("/login", function () {

// });

module.exports = router;
