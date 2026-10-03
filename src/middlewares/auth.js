const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("token is not valid !!!!!");
    }

    const decoded = await jwt.verify(token, "dev@tinder$790");

    const loggedinUser = await User.findById(decoded.id);
    if (!loggedinUser) {
      throw new Error("user not found....");
    }
    req.user = loggedinUser;
    next();
  } catch {
    res.status(400).send("something went wrong");
  }
};

module.exports = {
  userAuth,
};
