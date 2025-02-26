require('dotenv').config();
const cloudinary = require('cloudinary').v2;

module.exports = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.API_SECRET,
  api_key: process.env.API_KEY,
  secure: true,
});
