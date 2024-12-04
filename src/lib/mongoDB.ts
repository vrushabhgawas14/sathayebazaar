import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL!);
      // console.log("Connection Successfull.");
    }
  } catch (error) {
    console.error("Error Connecting to Mongoose.", error);
  }
};
