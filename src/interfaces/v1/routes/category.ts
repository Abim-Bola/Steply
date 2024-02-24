/* eslint-disable max-len */
import { Router } from "express";
import {CategoryController} from "interfaces/controllers/CategoryController";
import Authentication  from "interfaces/middlewares/auth";
import MethodNotAllowedHandler  from "interfaces/middlewares/methodNotAllowed";
import { categorySchema } from "interfaces/validations/category"
//
const router = Router();
const categoryController = new CategoryController();

router
.route("/")
  .post( Authentication.userLoggedin.bind(Authentication),categorySchema, categoryController.create)
  .all(MethodNotAllowedHandler);



// router.post("/", Authentication.userLoggedin.bind(Authentication), categoryController.create);

export default router;
