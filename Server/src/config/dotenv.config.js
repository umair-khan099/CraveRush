import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  EMAIL: process.env.EMAIL,
  APP_PASS: process.env.APP_PASS,
};

export default config;
