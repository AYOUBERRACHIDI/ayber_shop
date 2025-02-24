import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common/API";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.sendOtp.url, {
      method: SummaryApi.sendOtp.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success(data?.message);
      navigate("/verify-otp", { state: { email } });
    }
    if (data.error) {
      toast.error(data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row rounded-xl shadow-2xl overflow-hidden bg-white">
        {/* Image Section */}
        <div
          className="w-full lg:w-1/2 h-64 lg:h-auto bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/originals/d2/f1/3d/d2f13d48f5ec46049f05bf6af098e7e9.png')",
          }}
        ></div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Forgot Your Password?
            </h2>
            <p className="text-gray-600">
              No worries! Enter your email below, and we'll send you a link to
              reset your password.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              />
            </div>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/signup"
              className="text-sm text-blue-600 hover:text-blue-800 transition duration-300"
            >
              Don't have an account? Sign Up
            </Link>
          </div>

          <div className="mt-2 text-center">
            <Link
              to="/signIn"
              className="text-sm text-blue-600 hover:text-blue-800 transition duration-300"
            >
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;