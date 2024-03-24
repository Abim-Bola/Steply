
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
import "dotenv/config"
import express from "express";
import cors from "cors";
import morgan from "morgan";
import rabbitmQ from 'startup/rabbitmq';
import container from './container';

const app = express();
app.use((req, res, next) => {
  next();
});
require("./startup/db")();
require("./interfaces/v1/router")(app);
// eslint-disable-next-line import/extensions
app.use(express.urlencoded({ extended: false }));
app.use(cors());

 /**
   * Only log error responses and send all logs to the same file winston sends logs
   */
app.use((req, res, next) => {
  morgan('combined', {
      skip: function (req, res) { return res.statusCode < 400; },
      stream: { write: (message) => container.cradle.logger.info(message.trim()) } 
  })(req, res, next);
});


const PORT = 6379

app.get("/", async (req, res) => {
    return res.json({ message: "Hello" });
  });


const port = 8000;
app.listen(port, () => 
container.cradle.logger.info(`Listening on port ${port}...`)
);
app.use((err, req, res, next) => {
  return res.status(500).json({
      status: "error",
      message: err.message,
      stack: err.stack 
  });
});

export default app;
