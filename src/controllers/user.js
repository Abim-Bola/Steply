/* eslint-disable no-const-assign */
import userServices from "@services/user";
import { sanitize } from "@utils/sanitize";
import passwordService from "@services/password";
import { StatusCodes } from "http-status-codes";

export const authenticationController = {
  signup: async (req, res, next) => {
    try {
      let {
        firstName,
        lastName,
        password,
        email,
        companyName,
        jobTitle
      } = req.body;
      email = email.toLowerCase();
      firstName = firstName.toLowerCase();
      lastName = lastName.toLowerCase();
      const findUser = await userServices.findUser(email);
      console.log("🚀 ~ file: user.js ~ line 22 ~ signup: ~ findUser", findUser);
      if (findUser) {
        return res.status(StatusCodes.CONFLICT).json({ status: true, message: "User already exists" });
      }
      const hashedPassword = await passwordService.hash(password);
      const saveUser = await userServices.saveUser({
        firstName,
        password: hashedPassword,
        lastName,
        email,
        verified,
        companyName,
        jobTitle
      });
      return res.status(StatusCodes.CREATED).json({ status: true, message: "Signup Successful, Please check your email for a link to verify your account", data: sanitize(saveUser) });
    } catch (error) {
      next();
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const findUser = await userServices.findUser(email);
      // eslint-disable-next-line no-mixed-operators
      if (!findUser || findUser && findUser.verified === false) {
        return res.status(StatusCodes.NOT_FOUND).json({ status: true, message: "User does not exist" });
      }
    } catch (error) {
      next();
    }
  }
};
