import jwt from "jsonwebtoken";
import config from "../config/dotenv.config.js";
const generateToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, config.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    throw new Error("Token genration faild");
  }
};

export default generateToken;
