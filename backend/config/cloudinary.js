 const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dum3uhmau",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: "FDl1X25KUXS2rKupm5vnPZhwPz0",
  upload_preset: "GreenMart_product_images"
});


module.exports = cloudinary;
