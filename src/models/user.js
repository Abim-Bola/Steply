import jwt, { verify } from "jsonwebtoken"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
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
		companyName: {
			type: String,
			required: true,
		},
		jobTitle: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			// required: true,
		},
	},
	{ timestamps: true }
)

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next()
	this.password = await bcrypt.hash(this.password, 8)
	next()
})

userSchema.methods.comparePassword = function(password){
	const verify = bcrypt.compare(this.password, password)
	return verify;
}
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			email: this.email,
			verified: this.verified,
			subscription: this.subscription,
		},
		process.env.JWTSECRET
	)
	return token
}
userSchema.index({email: 1});
const User = mongoose.model("User", userSchema)



export default User
