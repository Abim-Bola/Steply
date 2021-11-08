import dotenv from "dotenv";

dotenv.config();
process.env.NODE_ENV = "development";
const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  JWTSECRET: process.env.JWTSECRET,
  getEnv() {
    if (process.env.NODE_ENV === "development") {
      this.MONGO_DB_URL = process.env.MONGO_DB_URL;
      this.JWTSECRET = process.env.JWTSECRET;
    } else {
      this.MONGO_DB_URL = process.env.MONGO_DB_URL;
      this.JWTSECRET = process.env.JWTSECRET;
    }
    return {
      MONGO_DB_URL: this.MONGO_DB_URL,
      JWTSECRET: this.JWTSECRET
    };
  }
};
export default env;
