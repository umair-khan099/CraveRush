import React, { useState } from "react";
import AuthLayout from "../../components/ui/AuthLayout";
import { EyeClosed, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { serverUrl } from "../../routes/app.route";
import axios from "axios";

const Login = () => {
  const [type, setType] = useState(true);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleLogin = () => {
    try {
      const userData = axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true },
      );
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthLayout>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl">
        {/* Heading */}
        <h1 className="text-xl font-bold text-[#1F1F1F] mb-1">Hi there!</h1>
        <p className="text-gray-500 text-sm mb-4">Welcome back</p>

        {/* Form */}
        <div className="space-y-3">
          {/* Email */}
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Email</label>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              placeholder="example@email.com"
              className="w-full px-3 py-2 rounded-lg border text-sm
              focus:ring-2 focus:ring-[#FFD700]
              transition-all duration-200
              hover:border-[#FFD700]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Password</label>

            <div className="relative">
              <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type={type ? "password" : "text"}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-lg border text-sm pr-10
                focus:ring-2 focus:ring-[#FFD700]
                transition-all duration-200
                hover:border-[#FFD700]"
              />

              <button
                type="button"
                onClick={() => setType(!type)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500
                hover:text-black transition-transform duration-200 active:scale-90"
              >
                {type ? <EyeClosed size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to={"/forgotpassword"}
              className="text-xs text-[#FFD700] font-bold    cursor-pointer hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full mt-5 bg-[#FFD700] py-2.5 rounded-lg text-sm font-semibold
        transition-all duration-200
        hover:bg-yellow-400
        active:scale-95 active:shadow-inner"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="px-2 text-gray-400 text-xs">OR</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        {/* Google */}
        <button
          className="w-full flex items-center justify-center gap-2 border py-2.5 rounded-lg text-sm
        transition-all duration-200
        hover:bg-gray-100 active:scale-95"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-4 h-4"
          />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Don’t have an account?
          <Link
            to={"/register"}
            className="text-[#FFD700] font-semibold cursor-pointer ml-1 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
