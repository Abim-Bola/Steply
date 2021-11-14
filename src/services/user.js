import User from "@models/user";

const userServices = {
  findUser: async email => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  saveUser: async ({ ...params }) => {
    try {
      const user = new User({ ...params });
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }
};
export default userServices;
