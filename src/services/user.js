import User from "@models/user";

const userServices = {
  findUser: async email => {
    try {
      console.log("🚀 ~ file: user.js ~ line 5 ~ email", email);
      const user = await User.findOne({ email });
      console.log("🚀 ~ file: user.js ~ line 8 ~ user", user);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  saveUser: async ({ ...params }) => {
    console.log("🚀 ~ file: user.js ~ line 10 ~ saveUser: ~ ...params", ...params);
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
