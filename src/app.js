/* eslint-disable arrow-body-style */
import express from "express";
import routes from "@startup/routes";
import cors from "cors";
import db from "@startup/db";
// eslint-disable-next-line import/extensions

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", async (req, res) => {
  return res.json({ message: "Hello King, I love you." });
});

db();
routes(app);

const port = process.env.PORT || 6000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
