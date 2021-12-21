/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
import express from "express";
import cors from "cors";
import db from "./startup/db";
import routes from "./interfaces/v1/router";
// eslint-disable-next-line import/extensions

const app = express();
db();
app.use(express.urlencoded({ extended: false }));
app.use(cors());

require("./startup/db")();
require("./interfaces/v1/router")(app);

app.get("/", async (req, res) => {
  return res.json({ message: "Hello" });
});

routes(app);

app.use((err, req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: err.message,
    stack: err.stack
  });
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
