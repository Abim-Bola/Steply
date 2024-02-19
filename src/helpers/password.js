import bcrypt from "bcrypt";
import zxcvbn from "zxcvbn";

const passwordService = {
  passwordStrengthChecker: async (password, first_name) => {
    try {
      return zxcvbn(password, first_name);
    } catch (error) {
      return error;
    }
  },

  passwordHash : async  (password, saltRounds = 10)  =>{
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          reject(err);
        }
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) {
            reject(error);
          }
          resolve(hash);
        });
      });
    });
  },

  compare : async  (password, hash) =>{
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, success) => {
        if (err) {
          reject(err);
        }
        resolve(success);
      });
    });
  }
};
export default passwordService;
