import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login";
const Home = () => {
  const copyText = useRef(null);
  const navigate = useNavigate();
  return (
    <>
      <section className="  bg-zinc-50 min-h-screen flex flex-wrap justify-around items-start pt-20 pb-20">
        <div className="px-6  max-w-4xl mx-auto text-left w-1/2 h-full">
          <h1 className="md:text-4xl text-3xl font-bold text-gray-900">
            Welcome to IMS
          </h1>
          <p className="md:text-xl text-lg font-semibold text-gray-700 pt-2">
            Inventory Management System for Efficient Stock Control
          </p>

          <div className="mt-8 text-gray-600 leading-relaxed space-y-4">
            <p>
              Our{" "}
              <span className="font-semibold text-gray-800">
                Inventory Management System (IMS)
              </span>{" "}
              is a smart and efficient solution designed to help businesses
              manage their products, stock levels, and suppliers with ease. It
              provides a centralized platform to
              <span className="font-medium">
                {" "}
                track inventory, update product details, monitor stock in real
                time, and generate useful reports
              </span>{" "}
              — all from one dashboard.
            </p>

            <ul className="text-left list-disc list-inside md:mx-10 space-y-2">
              <li>
                📦 <span className="font-medium">Add, edit, or remove</span>{" "}
                products effortlessly
              </li>
              <li>
                🔄 <span className="font-medium">Monitor stock quantities</span>{" "}
                to avoid overstocking or shortages
              </li>
              <li>
                🧾{" "}
                <span className="font-medium">Generate and view reports</span>{" "}
                for better decision-making
              </li>
              <li>
                👥{" "}
                <span className="font-medium">
                  Manage suppliers and purchase details
                </span>{" "}
                in one place
              </li>
            </ul>

            <p>
              The IMS helps businesses{" "}
              <span className="font-semibold text-gray-800">
                save time, reduce errors, and improve productivity
              </span>{" "}
              by automating routine inventory tasks. Whether it’s a small shop
              or a large warehouse, this system ensures that inventory is always
              <span className="font-medium">
                {" "}
                accurate, organized, and up to date.
              </span>
            </p>
          </div>
        </div>

        <div>
          <div className="bg-white  rounded-md shadow-md flex flex-col  md:p-10 px-4 py-4 m-2">
            <p className="md:text-2xl text-lg  font-semibold ">
              Sign in to your Account
            </p>
            <Login />
          </div>

          <div className="flex flex-col text-center pt-5 px-10 mt-10 bg-amber-300 py-8">
            <p className="text-xl font-semibold ">
              If You are New to this Website then Login with these details
            </p>
            <p>Email : primewatch@gmail.com </p>
            <p>
              Password : <span className="">primewatch</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
