/* eslint-disable no-const-assign */
import { sanitize } from "helpers/sanitize"
import { pick } from "lodash"
import HttpStatus from "http-status-codes";
import Response from "helpers/response"
import AuthRepository from "infra/repositories/AuthRepository"

class AuthController {
  constructor() {}

  async signupUser(req, res) {
    try {
      const payload = pick(req.body, [
        "first_name",
        "last_name",
        "email",
        "company_name",
        "job_title",
        "password",
        "confirm_password",
      ])
      const response = await AuthRepository.signup(payload)
      const message = response.message ? response.message : "Account Created"
      return Response.getResponseHandler(res).onSuccess(response, message,HttpStatus.CREATED)
    } catch (error) {
      return Response.getResponseHandler(res).onError(error)
    }
   
  }

  async loginUser(req, res) {
    try {
      const payload = pick(req.body, ["email", "password"])
      const response = await AuthRepository.login(payload)
      return Response.getResponseHandler(res).onSuccess(response, "Login Successful", HttpStatus.OK)
    } catch (error) {
      return  Response.getResponseHandler(res).onError(error)
    }

  }

  async changeUserPassword(req, res) {
    const { user } = req
    //pass the user inside the authRepository in order to access it in  the controller file
  }
}
export default new AuthController()
