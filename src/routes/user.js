/* eslint-disable max-len */
import
{ authenticationController }
from "@controllers/user";

const express = require("express");

const router = express.Router();

router.post("/signup", authenticationController.signup);

export default router;
