const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://shubhamyedage101_db_user:fBwvHDSsoBVF7i2K@devtinder.slhwrjx.mongodb.net/",
  );
};

module.exports = (connectDB);


