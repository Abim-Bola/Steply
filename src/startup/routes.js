import users from "@routes/user";

const express = require("express");

module.exports = app => {
  app.use(express.json());
  app.use("/api/v1/users", users);
};

//king