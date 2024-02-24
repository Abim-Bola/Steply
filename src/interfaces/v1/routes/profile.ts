import Authentication  from "interfaces/middlewares/auth";
import container from '../../../container';
import  ProfileController from "interfaces/controllers/ProfileController";

const { Router } = require("express");

const router = Router();

router.get("/",
Authentication.userLoggedin.bind(Authentication), 
container.cradle.redisClient.useRedisCache.bind(container.cradle.redisClient),
ProfileController.get);

export default router;
