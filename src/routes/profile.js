const express = require("express");
const profileRouter = express();
const { userAuth } = require("../middlewares/auth.js");
const {validateEditProfileData} = require("../utils/validation.js");


profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
 
    res.send(loggedinUser);
    console.log(loggedinUser);
  } catch {
    res.status(400).send("something went wrong");
  }
});

profileRouter.patch("/profile/update", userAuth, async (req, res) => {
  try{
      if (!validateEditProfileData(req)) {
        return res.status(400).send("Profile update contains unsupported fields");
      }
      const loggedInUser = req.user;

      Object.keys(req.body).forEach((key)=>loggedInUser[key] = req.body[key]);
      await loggedInUser.save();
      return res.send("profile updated successfully");
  }
  catch (err) {
    console.error("Profile update failed:", err);
    return res.status(400).send("something went wrong");
  }
})

module.exports = profileRouter;