import mongoose from "mongoose";
import { maxNameLength, minNameLength, regex } from "../utils/constant.js";

const userSchema = mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        match: regex.phoneNumber
    },
    firstName: {
        type: String,
        required: true,
        maxLength: maxNameLength,
        minLength: minNameLength
    },
    lastName: {
        type: String,
        default: "",
        maxLength: maxNameLength,
        minLength: minNameLength
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    city: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre("save", (next) => {
    this.updatedAt = Date.now()
    next();
});

userSchema.pre("findOneAndUpdate", (next) => {
    this._update.updatedAt = Date.now();
    next();
});

export const User = mongoose.model("User", userSchema);