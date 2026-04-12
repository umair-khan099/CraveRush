import React, { useState } from "react";
import AuthLayout from "../../components/ui/AuthLayout";
import { Eye, EyeClosed, Tornado } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../routes/app.route";

const Register = () => {
  const [type, setType] = useState(true);
  const [selectedRole, setSelectedRole] = useState("User");
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    try {
      const userData = axios.post(
        `${serverUrl}/api/auth/register`,
        {
          fullName,
          email,
          mobile,
          password,
          selectedRole,
        },
        { withCredentials: true },
      );
      console.log(userData );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthLayout>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl">
        {/* Heading */}
        <h1 className="text-xl font-bold text-[#1F1F1F] mb-1">Hi there!</h1>
        <p className="flex items-center gap-1 text-gray-500 text-sm mb-4">
          Welcome To CraveRush <Tornado size={16} />
        </p>

        {/* Form */}
        <div className="space-y-3">
          {/* Name */}
          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-2 rounded-lg border text-sm 
              focus:ring-2 focus:ring-[#FFD700] 
              transition-all duration-200 
              hover:border-[#FFD700]"
            />
          </div>

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

          {/* Mobile */}
          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              Mobile Number
            </label>
            <input
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
              type="tel"
              placeholder="000-000-0000"
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
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Role */}
          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              Select Role
            </label>
            <div className="flex gap-2">
              {["User", "Chef", "Delivery Boy"].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-3 py-1 text-sm rounded-xl  border transition-all duration-200
                  active:scale-90 ${
                    selectedRole === role
                      ? "bg-[#FFD700] text-black border-[#FFD700] scale-105"
                      : "bg-white text-gray-500 hover:border-[#FFD700]"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full mt-5 bg-[#FFD700] py-2.5 rounded-lg text-sm font-semibold 
        transition-all duration-200 
        hover:bg-yellow-400 
        active:scale-95 active:shadow-inner"
        >
          Register
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
          Already have an account?
          <Link
            to={"/login"}
            className="text-[#FFD700] font-semibold cursor-pointer ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
