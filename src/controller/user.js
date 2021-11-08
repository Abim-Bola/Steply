import userServices from "@services/user";
import env from "@config/environment";

console.log("🚀 ~ file: user.js ~ line 3 ~ env", env);
console.log("🚀 ~ file: user.js ~ line 3 ~ env");

const authenticationController = {
  signup: async (req, res, next) => {
    try {
      const findUser = await userServices.findUser(req.body.email);
    } catch (error) {
      next();
    }
  }
};
