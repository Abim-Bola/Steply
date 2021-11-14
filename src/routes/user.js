/* eslint-disable max-len */
import { authenticationController } from "@controllers/user";

const { Router } = require("express");

const router = Router();

router.post("/signup", authenticationController.signup);
router.post("/login", authenticationController.login);

export default router;
