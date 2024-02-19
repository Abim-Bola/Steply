/* eslint-disable max-len */
import AuthController from "interfaces/controllers/AuthController";
import Authentication  from "interfaces/middlewares/auth";
import { signupValidationSchema, loginValidationSchema } from "interfaces/validations/auth"
import  ProfileController from "interfaces/controllers/ProfileController";

const { Router } = require("express");

const router = Router();

router.get("/", Authentication.userLoggedin.bind(Authentication), ProfileController.get);

export default router;
