import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex ">
      {/* LEFT - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#F5F5F5] px-4">
        {children}
      </div>

      {/* RIGHT - IMAGE */}
      <div className="hidden lg:flex w-1/2 bg-[#FFD700] items-center justify-center relative">
        <img
          src="https://i.pinimg.com/736x/23/24/7c/23247c405565b506b0ab7de6bd7e98aa.jpg"
          alt="food"
          className="w-[80%] rounded-3xl shadow-2xl object-cover"
        />
        <div className="absolute inset-0 bg-yellow-400/20"></div>
      </div>
    </div>
  );
};

export default AuthLayout;
