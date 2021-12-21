/* eslint-disable max-len */
import AuthController from "interfaces/controllers/AuthController";
import Authentication  from "interfaces/middlewares/auth";
import { signupValidationSchema, loginValidationSchema } from "interfaces/validations/auth"
import { ProfileController } from "interfaces/controllers/ProfileController";

const { Router } = require("express");

const router = Router();
const profileController = new ProfileController();

router.post("/signup", signupValidationSchema, AuthController.signupUser);
router.post("/login", loginValidationSchema, AuthController.loginUser);



router.post("/profile", Authentication.userLoggedin.bind(Authentication), profileController.profile);

export default router;
