import React, { useState } from "react";
import AuthLayout from "../../components/ui/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../routes/app.route";
import axios from "axios";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setemail] = useState("");
  const [otp, setotp] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const handleSendOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true },
      );
      console.log(result);
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };
  const handleverifyOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true },
      );
      console.log(result);
      setStep(3);
    } catch (error) {
      console.log(error);
    }
  };
  const handelResetPassword = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true },
      );
      console.log(result);
      navigate("/login");
    } catch (error) {}
  };
  return (
    <AuthLayout>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-5 transition-all duration-300 hover:shadow-xl">
        {/* Heading */}
        <h1 className="text-xl font-bold text-[#1F1F1F] mb-1">
          Forgot Password?
        </h1>
        <p className="text-gray-500 text-sm mb-4">
          Don’t worry, we’ll send you reset instructions
        </p>

        {/* Image */}
        <div className="flex justify-center mb-4">
          <img
            src="https://i.pinimg.com/1200x/71/5b/0c/715b0cc88e41a29d1e6019b1e3df7580.jpg"
            alt="forgot-password"
            className="w-28 h-28 object-cover rounded-xl"
          />
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">
                  Email Address
                </label>
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
            </div>

            <button
              onClick={handleSendOtp}
              className="w-full mt-5 bg-[#FFD700] py-2.5 rounded-lg text-sm font-semibold
              transition-all duration-200
              hover:bg-yellow-400
              active:scale-95"
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">
                  Enter OTP
                </label>
                <input
                  value={otp}
                  onChange={(e) => setotp(e.target.value)}
                  type="text"
                  placeholder="Enter 6 digit OTP"
                  className="w-full px-3 py-2 rounded-lg border text-sm
                  focus:ring-2 focus:ring-[#FFD700]
                  hover:border-[#FFD700]"
                />
              </div>
            </div>

            <button
              onClick={handleverifyOtp}
              className="w-full mt-5 bg-[#FFD700] py-2.5 rounded-lg text-sm font-semibold
              hover:bg-yellow-400 active:scale-95"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">
                  New Password
                </label>
                <input
                  value={newPassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-lg border text-sm
                  focus:ring-2 focus:ring-[#FFD700]"
                />
              </div>
            </div>

            <button
              onClick={handelResetPassword}
              className="w-full mt-5 bg-[#FFD700] py-2.5 rounded-lg text-sm font-semibold
              hover:bg-yellow-400 active:scale-95"
            >
              Reset Password
            </button>
          </>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Remember your password?
          <Link
            to="/login"
            className="text-[#FFD700] font-semibold ml-1 hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgetPassword;
