import mongoose from "mongoose";

const connectDB = async () => {
  const uri = "mongodb://localhost:27017/onlinegateprep";
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};
export default connectDB;
