const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/Pranav";

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = {
  connect,
};
