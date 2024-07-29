import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
let dbUrl = process.env.MONGODB_CLOUD;
//connect mongodb
let connectToMongoDb = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log(
      `application is connected to mongodb at port ${dbUrl} successfully.`
    );
  } catch (error) {
    console.log(error.message);
  }
};
export default connectToMongoDb;
