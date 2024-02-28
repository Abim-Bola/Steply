import mongoose from "mongoose";
import env from '../config/config'
import container from '../container';
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
    if (connection) container.cradle.logger.info("Connected to mongodb database successfully");
  } catch (error) {
    container.cradle.logger.error(`Could not connect to the database, ${error}`);
    process.exit(1);
  }
};

