const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to db successfully");
  } catch (err) {
    console.log("error in connecting to Db");
  }
};

module.exports = connectdb;
