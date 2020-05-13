const router = require("express").Router();
const { auth } = require("../middlewares/auth");

router.get("", auth, async function (req, res) {
  res.send(`Get your own posts ${req.user.name}`);
});

module.exports = router;
