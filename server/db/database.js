import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Add your MongoDB connection string here
    console.log("MongoDB Connected!");
  } catch (e) {
    console.log(e);
  }
};

export default connectDB;
