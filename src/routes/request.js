
const express = require("express");
const mongoose = require("mongoose");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const connectionRequest = require("../models/connectionRequestSchemaModel.js");
const User = require("../models/user.js");

requestRouter.post("/res/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatuses = ["Ignored", "Interested", "accepted", "rejected"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid Status type " + status });
    }

    if (fromUserId.toString() === toUserId.toString()) {
      return res.status(400).send({ message: "you cannot send request to yourself" });
    }

    if (!mongoose.Types.ObjectId.isValid(toUserId)) {
      return res.status(404).send({ message: "user not found" });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).send({ message: "user not found" });
    }

    const existingConnectionRequest = await connectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(400).send({
        message: "Connection request already exists between these users.",
      });
    }

    const connectionRequestData = new connectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    await connectionRequestData.save();
    return res.status(200).send({
      message: `${req.user.firstName} ${status} in ${toUser.firstName}`,
      data: connectionRequestData,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: error.message });
  }
});

module.exports = requestRouter;