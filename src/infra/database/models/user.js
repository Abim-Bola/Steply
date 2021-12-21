/* eslint-disable no-underscore-dangle */
import jwt, { verify } from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    subscription: {
      type: Boolean,
      required: true,
      default: false,
    },
    company_name: {
      type: String,
      required: true,
    },
    job_title: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

userSchema.methods.comparePassword = async function (password) { 
return await bcrypt.compare(this.password, password) };


userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 6, // Expires in 6 hrs
        sub: this._id,
      email: this.email,
      verified: this.verified,
      subscription: this.subscription,
    },
    process.env.JWTSECRET
  );
  return token;
};
userSchema.index({ email: 1 });
const User = mongoose.model("User", userSchema);

export default User;
