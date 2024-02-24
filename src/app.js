
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
import "dotenv/config"
import config from 'config'
import express from "express";
import { createContainer, asClass, InjectionMode, Lifetime, asFunction, asValue } from "awilix";
import { createClient } from 'redis';
import cors from "cors";
import morgan from "morgan";
import db from "./startup/db.js";
import session from 'express-session';
import connectRedis from 'connect-redis';
import routes from "./interfaces/v1/router.js";
import RedisClient from './services/redis.js';
import container from './container';


//create a container file
//do the same thing in app,
//call the export to register new var
//import the container and access the var. 
const app = express();
app.use((req, res, next) => {
  next();
});
require("./startup/db")();
require("./interfaces/v1/router")(app);
// eslint-disable-next-line import/extensions
 container.cradle.redisClient.isAlive(),
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('tiny'));

const PORT = 6379

app.get("/", async (req, res) => {
    return res.json({ message: "Hello" });
  });


const port = 8000;
app.listen(port, () => 
console.log(`Listening on port ${port}...`),
);
app.use((err, req, res, next) => {
  return res.status(500).json({
      status: "error",
      message: err.message,
      stack: err.stack 
  });
});

export default app;
