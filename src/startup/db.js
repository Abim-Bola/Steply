import mongoose from "mongoose";
import env from '../config/config'
require("dotenv").config();

module.exports = () => {
  try {
    const db = env.getEnv().MONGO_DB_URL
    mongoose.set('strictQuery', true)
    const connection = mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false
    });
    if (connection) console.log("Connected to database successfully");
  } catch (error) {
    console.log("Could not connect to the database", error);
    process.exit(1);
  }
};

