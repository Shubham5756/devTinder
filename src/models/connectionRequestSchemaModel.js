const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    pairKey: {
      type: String,
      unique: true,
      sparse: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["Ignored", "Interested", "accepted", "rejected"],
        message: "{VALUE} is incorrect status type",
      },
    },
  },
  { timestamps: true },
);

connectionRequestSchema.index({fromUserId : 1 , toUserId : 1})

connectionRequestSchema.pre("validate", function (next) {
  if (this.fromUserId && this.toUserId) {
    const pair = [this.fromUserId.toString(), this.toUserId.toString()].sort();
    this.pairKey = `${pair[0]}_${pair[1]}`;
  } else {
    this.pairKey = undefined;
  }
  next();
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
