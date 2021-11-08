/* eslint-disable arrow-body-style */
import express from "express";
// import const from "@controller/user.js";
import util from "@utils/environment";
import cors from "cors";
// eslint-disable-next-line import/extensions

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
// console.log(env);
process.env.NODE_ENV = "development";
app.get("/", async (req, res) => {
  return res.json({ message: "Hello King, I love you." });
});
console.log("🚀 ~ file: environment.js ~ line 9 ~ process.env.NODE_ENV", process.env.NODE_ENV);

// let configDetails;
// if (process.env.NODE_ENV === "development") {
//   const { dbConfig } = config.get("production");
//   console.log("🚀 ~ file: app.js ~ line 18 ~ dbConfig", dbConfig);
// }

// console.log(configObject.host);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
