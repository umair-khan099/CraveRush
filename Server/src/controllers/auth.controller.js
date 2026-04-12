import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { sendOtpEmail } from "../utils/mail.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role, mobile } = req.body;

    const existingUser = await userModel.findOne({
      email: email.toLowerCase(),
    });
    if (existingUser) {
      return res.status(400).json({ message: "User Already exist" });
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 charecters" });
    }
    if (!mobile || mobile.length < 10) {
      return res
        .status(400)
        .json({ message: "Mobile must be at least 10 digits" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashPassword,
      mobile,
      role,
    });

    const token = generateToken(user._id);
    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(201).json({
      message: "user register Successfully",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const token = generateToken(user._id);
    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(201).json({
      message: "user Login successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(201).json({ message: "log out successfully" });
  } catch (error) {
    return res.status(500).json(`sign out error ${error} `);
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User dose not exist" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();
    await sendOtpEmail(email, otp);
    return res.status(201).json({ message: "otp sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
