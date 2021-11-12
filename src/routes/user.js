/* eslint-disable max-len */
import { authenticationController } from "@controllers/user"

const { Router } = require("express")

const router = Router()

router.post("/signup", authenticationController.signup)

export default router
