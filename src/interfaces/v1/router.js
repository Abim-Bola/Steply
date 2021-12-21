import auth from "interfaces/v1/routes/auth";
import users from "../../startup/db";

const express = require("express");

module.exports = app => {
  app.use(express.json());
  app.use("/api/v1/auth", auth);
};
