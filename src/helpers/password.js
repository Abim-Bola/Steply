import bcrypt from "bcrypt";
import zxcvbn from "zxcvbn";

const passwordService = {
  passwordStrengthChecker: async (password, first_name) => {
    try {
      return zxcvbn(password, first_name);
    } catch (error) {
      return error;
    }
  }
};
export default passwordService;
