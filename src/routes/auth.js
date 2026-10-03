const express = require("express");
const authRouter = express();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const { validateSignUpData } = require("../utils/validation.js");

authRouter.post("/signup", async (req, res) => {
  //console.log(req.body);
  try {
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).send("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).send("Invalid email or password");
    }

    const token = await user.getJWT();
    res.cookie("token", token);
    return res.send("login successful");
  } catch (err) {
    console.error("Login failed:", err);
    return res.status(500).send("Unable to log in");
  }
});

authRouter.post("/logout" , (req ,res)=>{
 res.cookie("token" , "null", {expires : new Date(Date.now())});
 res.send("logout successful");
 
});

module.exports = authRouter;