require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database is connected on cluster : ${conn.connection.host}`);
  } catch (error) {
    console.log('Connection is error:', error);
  }
};

module.exports = connectDB;
