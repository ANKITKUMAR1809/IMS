import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BuildingStorefrontIcon,
  EnvelopeIcon,
  KeyIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Register = () => {
  const navigate = useNavigate();

  const [register, setRegister] = useState({
    shopname: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setRegister({
      ...register,
      [name]: value,
    });
  };

  const notify = (msg, success) => {
    if (success) {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  };

  const onRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log(register);
    try {
      const response = await fetch(
        "https://ims-yxa0.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(register),
        }
      );
      console.log(response);
      if (response.ok) {
        notify("Registration Successful!", true);
        setRegister({
          shopname: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        notify("Invalid Input. Please try again.", false);
      }
    } catch (error) {
      notify("Server Unreachable", false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
      />

      <div className="max-w-md w-full mx-auto">
        {/* Logo/Header Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-linear-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <BuildingStorefrontIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to IMS
          </h1>
          <p className="text-gray-600">
            Register your shop and manage inventory effortlessly
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <UserPlusIcon className="h-6 w-6 text-blue-500" />
              Create Account
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Fill in your details to get started
            </p>
          </div>

          <form onSubmit={onRegisterSubmit} className="space-y-6">
            {/* Shop Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="shopname"
                className="block text-sm font-medium text-gray-700"
              >
                Shop Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BuildingStorefrontIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="shopname"
                  id="shopname"
                  value={register.shopname}
                  onChange={handleInput}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none text-gray-800 placeholder-gray-400"
                  placeholder="Anil Handloom"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">
                Enter your official shop/business name
              </p>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="user@ims.com"
                  value={register.email}
                  onChange={handleInput}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={register.password}
                  onChange={handleInput}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none text-gray-800 placeholder-gray-400"
                  required
                  minLength={6}
                />
              </div>
              <p className="text-xs text-gray-500">
                Minimum 6 characters required
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-linear-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Already have an account?</p>
              <button
                onClick={handleLoginRedirect}
                className="mt-3 group inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                <span>Sign in to your account</span>
                <ArrowRightOnRectangleIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Terms & Conditions */}
          <p className="mt-8 text-center text-xs text-gray-500">
            By registering, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Need help?{" "}
            <a
              href="mailto:support@ims.com"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
