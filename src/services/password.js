import bcrypt from "bcrypt";

const passwordService = {
  hash: async password => {
    try {
      return bcrypt.hash(password, 10);
    } catch (error) {
      return error;
    }
  },

  compare: async (password, oldPassword) => {
    try {
      bcrypt.compare(password, oldPassword);
    } catch (error) {
      return error;
    }
  }
};
export default passwordService;
