import nodemailer from "nodemailer";
import config from "../config/dotenv.config.js";
const transporter = nodemailer.createTransport({
  host: "Gmail",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: config.EMAIL,
    pass: config.APP_PASS,
  },
});

export const sendOtpEmail = async (to, otp) => {
  await transporter.sendEmail({
    to,
    subject: "Reset Your Password",
    html: `<p> Your OTP for reset password is <b> ${otp} </b> expires in 2 minut`,
  });
};
