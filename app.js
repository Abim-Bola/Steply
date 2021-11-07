/* eslint-disable arrow-body-style */
import express from "express";
import config from "config";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", async (req, res) => {
  return res.json({ message: "Hello King, I love you." });
});

console.log(config.get("password"));
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
