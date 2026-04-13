import nodemailer from "nodemailer";
import config from "../config/dotenv.config.js";

const transporter = nodemailer.createTransport({
  service: "gmail", // Use 'service' instead of 'host' for Gmail
  auth: {
    user: config.EMAIL,
    pass: config.APP_PASS,
  },
});

export const sendOtpEmail = async (to, otp) => {
  try {
    // Changed from sendEmail to sendMail
    await transporter.sendMail({
      from: config.EMAIL, // Added the 'from' address
      to,
      subject: "Reset Your Password",
      html: `<p> Your OTP for reset password is <b> ${otp} </b> expires in 2 minutes.</p>`,
    });
    console.log("OTP email sent successfully!");
  } catch (error) {
    console.error("Error sending OTP email: ", error);
    throw error;
  }
};