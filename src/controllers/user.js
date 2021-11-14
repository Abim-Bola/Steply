/* eslint-disable no-const-assign */
import userServices from "@services/user";
import { sanitize } from "@utils/sanitize";
import { StatusCodes } from "http-status-codes";
import Response from "@utils/response";
import passwordService from "@services/password";

export const authenticationController = {
  signup: async (req, res, next) => {
    try {
      let {
        firstName, lastName, password, email, companyName, jobTitle
      } =
				req.body;
      email = email.toLowerCase();
      firstName = firstName.toLowerCase();
      lastName = lastName.toLowerCase();
      const findUser = await userServices.findUser(email);
      if (findUser) {
        return Response.send(
          res,
          null,
          StatusCodes.CONFLICT,
          "User already exists"
        );
      }
      console.log("abim")
      // check password strength
      const passwordStrength = await passwordService.passwordChecker(password, firstName);
      console.log("abim");
      console.log("🚀 ~ file: user.js ~ line 29 ~ signup: ~ passwordStrength", passwordStrength);
      if (passwordStrength.score < 3) {
        Response.send(
          res,
          null,
          StatusCodes.BAD_REQUEST,
          "Weak Password"
        );
      }
      const saveUser = await userServices.saveUser({
        firstName,
        password,
        lastName,
        email,
        companyName,
        jobTitle,
      });
      Response.send(
        res,
        sanitize(saveUser),
        StatusCodes.CREATED,
        "Signup Successful, Please check your email for a link to verify your account"
      );
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const findUser = await userServices.findUser(email);
      // eslint-disable-next-line no-mixed-operators
      if (!findUser || (findUser && findUser.verified === false)) {
        Response.send(
          res,
          null,
          StatusCodes.NOT_FOUND,
          "User not found"
        );
      }
      const verifyPassword = await findUser.comparePassword(password);
      if (verifyPassword) {
        Response.send(
          res,
          null,
          StatusCodes.UNAUTHORIZED,
          "Wrong user login details"
        );
      }
      const token = findUser.generateAuthToken();
      Response.send(
        res,
        token,
        StatusCodes.OK,
        "Login Successful"
      );
    } catch (error) {
      next(error);
    }
  },
};
