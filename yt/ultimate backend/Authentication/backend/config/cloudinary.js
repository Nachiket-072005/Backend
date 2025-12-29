import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageOnCloudinary = async (filepath) => {
  try {
    if (!filepath) {
      return null;
    }
    let result = await cloudinary.uploader.upload(filepath);
    console.log("Image uploaded to Cloudinary:", result);
    fs.unlinkSync(filepath); // Delete the local file after upload
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(filepath); // Delete the local file in case of error
    console.error("Error uploading image to Cloudinary:", error);
  }
};

export default uploadImageOnCloudinary;
