const userServices = {
  findUser: async email => {
    try {
      return await User.findOne(email);
    } catch (error) {
      return error;
    }
  },
};
export default userServices;
