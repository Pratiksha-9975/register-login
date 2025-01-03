// app/api/lib/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }
    await mongoose.connect(
      "mongodb+srv://vaibhavavate:TikNd5hK3ARGj5dY@cluster0.m1to9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectDB;
