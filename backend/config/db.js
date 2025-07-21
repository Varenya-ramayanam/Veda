const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        dotenv.config();
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`MongoDB Connected successfully!`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;