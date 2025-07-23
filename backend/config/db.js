const mongoose = require('mongoose');
const dotenv = require('dotenv');

// ✅ Load .env from root directory
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is undefined. Check your .env file.");
    }

    const conn = await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected successfully!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
