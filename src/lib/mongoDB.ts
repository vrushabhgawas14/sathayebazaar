import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const uri: string = process.env.MONGO_URL || "";
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri);
      console.log("Connection Successfull.");
    }
  } catch (error) {
    console.log("Error Connecting to Mongoose.", error);
  }
};
