/* eslint-disable max-len */
import AuthController from "interfaces/controllers/AuthController";
import { signupValidationSchema, loginValidationSchema } from "interfaces/validations/auth"

const { Router } = require("express");

const router = Router();

router.post("/signup", signupValidationSchema, AuthController.signupUser);
router.post("/login", loginValidationSchema, AuthController.loginUser);


export default router;
