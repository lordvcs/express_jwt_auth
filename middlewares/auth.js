const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function auth(req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: data._id });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: {
        message: "Unauthorized access",
      },
    });
  }
}

module.exports = {
  auth,
};
