import dotenv from "dotenv";
dotenv.config();
process.env.NODE_ENV = "development";
const env = {
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ISSUER: process.env.JWT_ISSUER,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE,
  getEnv() {
    if (process.env.NODE_ENV === "development") {
      this.MONGO_DB_URL = process.env.MONGO_DB_URL;
      this.JWT_SECRET = process.env.JWT_SECRET;
      this.JWT_ISSUER = process.env.JWT_ISSUER,
      this.JWT_AUDIENCE = process.env.JWT_AUDIENCE
    } else {
      //To be defined in heroku or github secrets
      this.MONGO_DB_URL = process.env.MONGO_DB_URL_PRODUCTION;
      this.JWT_SECRET = process.env.JWT_SECRET;
    }
    return {
      MONGO_DB_URL: this.MONGO_DB_URL,
      JWT_SECRET: this.JWT_SECRET,
      JWT_ISSUER: this.JWT_ISSUER,
      JWT_AUDIENCE: this.JWT_AUDIENCE
    };
  }
};

//env.getenv().
export default env;
