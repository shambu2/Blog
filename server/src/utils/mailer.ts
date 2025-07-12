import nodemailer from "nodemailer";

export const sendOTP = async (email:string,otp:string) => {

    const transporter = nodemailer.createTransport({
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
    }

    await transporter.sendMail(mailOptions);

}