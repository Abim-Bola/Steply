import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    verified:{
        type: Boolean,
        required: true,
        default: false
    },
    subscription:{
        type: Boolean,
        required: true,
        default: false   
    },
    companyName:{
        type: String,
        required: true
    },
    jobTitle:{
        type: String,
        required: true
    },
    token:{
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id, email: this.email,
        verified: this.verified, subscription: this.subscription
    },
        process.env.JWTSECRET);
    return token;
}

const User = mongoose.model('User', userSchema);

export default User;
