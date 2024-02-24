import auth from "interfaces/v1/routes/auth";
import category from "interfaces/v1/routes/category.ts"
import profile from "interfaces/v1/routes/profile.ts"

const express = require("express");

module.exports = app => {
  app.use(express.json());
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/category", category);
  app.use("/api/v1/profile", profile);
};
