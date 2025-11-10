import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login";
const Home = () => {
  const copyText = useRef(null);
  const navigate = useNavigate();
  return (
    <>
      <section className="  bg-zinc-50 min-h-screen flex flex-wrap justify-around items-center">
        <div>
          <h1 className="md:text-4xl text-3xl font-bold text-center">Welcome to IMS</h1>
          <p className="md:text-xl text-lg text-center font-semibold pt-2 ">
            Inventory Management System for Efficient Stock Control.
          </p>
        </div>
        <div>
          <div className="bg-white  rounded-md shadow-md flex flex-col  md:p-10 px-4 py-4 m-2">
            <p className="md:text-2xl text-lg  font-semibold ">Sign in to your Account</p>
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
