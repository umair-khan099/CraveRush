import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {
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

