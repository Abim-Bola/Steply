import userServices from "@services/user";

const authenticationController = {
  signup: async (req, res, next) => {
    try {
      const findUser = await userServices.findUser(req.body.email);
    } catch (error) {
      next();
    }
  }
};
