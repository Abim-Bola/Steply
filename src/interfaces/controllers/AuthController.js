/* eslint-disable no-const-assign */
import { sanitize } from "helpers/sanitize";
import { pick } from "lodash";
import { StatusCodes } from "http-status-codes"
import Response from "helpers/response";
import AuthRepository from "infra/repositories/AuthRepository";


class AuthController {
  constructor() {
  }

  async signupUser(req, res) {
    const payload = pick(req.body, ["first_name", "last_name", "email", "company_name", "job_title", "password"])
    const response = await AuthRepository.signup(payload);
    return Response.send(res, response, StatusCodes.CREATED, "Account Created");
  }

  async loginUser(req, res) {  
    const payload = pick(req.body, ["email", "password"])
    const response = await AuthRepository.login(payload);
    return Response.send(res, response, StatusCodes.OK, "Login Successful");
  }

  async changeUserPassword(req, res) {
    const { user } = req;
    //pass the user inside the authRepository in order to access it in  the controller file 
  }
}


// export const authenticationController = {
//   signup: async (req, res, next) => {
//     try {
//       let {
//         firstName, lastName, password, email, companyName, jobTitle
//       } =
// 				req.body;
//       email = email.toLowerCase();
//       firstName = firstName.toLowerCase();
//       lastName = lastName.toLowerCase();
//       const findUser = await userServices.findUser(email);
//       if (findUser) {
//         return ConflictError("User already exists");
//       }
//       // check password strength
//       const passwordStrength = await passwordService.passwordChecker(password, firstName);
//       if (passwordStrength.score < 3) {
//         InvalidPayloadError("Weak Password");
//       }
//       const saveUser = await userServices.saveUser({
//         firstName,
//         password,
//         lastName,
//         email,
//         companyName,
//         jobTitle,
//       });
//       return saveUser.getPublicFields();
//     } catch (error) {
//       next(error);
//     }
//   },
// login: async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const findUser = await userServices.findUser(email);
//     // eslint-disable-next-line no-mixed-operators
//     if (!findUser || (findUser && findUser.verified === false)) {
//       Response.send(
//         res,
//         null,
//         StatusCodes.NOT_FOUND,
//         "User not found"
//       );
//     }
//     const verifyPassword = await findUser.comparePassword(password);
//     if (verifyPassword) {
//       Response.send(
//         res,
//         null,
//         StatusCodes.UNAUTHORIZED,
//         "Wrong user login details"
//       );
//     }
//     const token = findUser.generateAuthToken();
//     Response.send(
//       res,
//       token,
//       StatusCodes.OK,
//       "Login Successful"
//     );
//   } catch (error) {
//     next(error);
//   }
// },
// };

export default new AuthController();