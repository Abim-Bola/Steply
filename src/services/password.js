import bcrypt from "bcrypt";
import zxcvbn from "zxcvbn";

const passwordService = {
  passwordChecker: async (password, firstName) => {
    try {
      return await zxcvbn(password, firstName);
    } catch (error) {
      return error;
    }
  }
};
export default passwordService;
