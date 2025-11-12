import mongoose from "mongoose";

const connectDB = async () => {
  // use 127.0.0.1 to avoid IPv6 ::1 resolution issues
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
