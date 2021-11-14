const mongoose = require("mongoose");
require("dotenv").config();

module.exports = () => {
  try {
    const db = process.env.MONGO_DB_URL;
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
