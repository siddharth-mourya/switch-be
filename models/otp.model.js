import mongoose from "mongoose";
import { regex } from "../utils/constant.js";

const { Schema} = mongoose;

const otpSchema = new Schema({
    phoneNumber: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    otp: {
        type: String,
        required: true,
        matches: regex.otp // Ensures the OTP is a 6-digit number
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // OTP will expire after 5 minutes
    },
});

export const OTP = mongoose.model('OTP', otpSchema);