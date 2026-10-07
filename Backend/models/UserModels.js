import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Field Is Mendatory"]
    },
    userName: {
        type: String,
        unique: true,
        required: [function () { return !this.googleId; }, "User Name Is Mendatory"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email Address Is Mendatory"]
    },
    phone: {
        type: String,
        required: [function () { return !this.googleId; }, "Phone Number Is Mendatory"]
    },
    password: {
        type: String,
        required: [function () { return !this.googleId; }, "Password Field Is Mendatory"]
    },
    googleId: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: "user"
    },
    otpAuthObject: {
        type: Object,
        default: {}
    },
    status: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

const User = mongoose.model("User", UserSchema)
export default User