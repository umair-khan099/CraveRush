import mongoose from "mongoose";
import config from "./dotenv.config.js";

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      dbName: "CraveRush",
    });    
  } catch (error) {
    console.log("faild to connect DB", error.message);
    process.exit(1);
  }
};

export default connectDB;
