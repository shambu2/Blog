"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendOTP = async (email, otp) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'verify your email',
        text: `Your OTP is: ${otp}`
    };
    await transporter.sendMail(mailOptions);
};
exports.sendOTP = sendOTP;
