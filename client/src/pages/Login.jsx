import React, { useState } from "react";
import { useAuth } from "../store/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Progress from "../components/Progress";

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setLogin({
      ...login,
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

  const { storeToken, url } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const response = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      if (response.ok) {
        const res_data = await response.json();
        storeToken(res_data.token);
        setLogin({ email: "", password: "" });
        setLoad(false);
        notify("Login Successful", true); // Show success notification

        // Delay the navigation to give the toast time to show
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000); // 1-second delay before redirecting
      } else {
        notify("Invalid Credentials", false); // Show error notification
      }
    } catch (error) {
      notify("Server Unreachable", false);
    }
  };

  return (
    <section>
      <ToastContainer />
      <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5 mt-5">
        <div className="flex flex-col justify-start gap-4 text-xl">
          <label htmlFor="email">Email</label>
          <input
            className="outline-blue-600 px-4 py-2 rounded bg-gray-100"
            type="email"
            placeholder="user@ims.com"
            value={login.email}
            onChange={handleInput}
            name="email"
            id="email"
            required
          />
        </div>
        <div className="flex flex-col justify-start gap-4 text-xl">
          <label htmlFor="password">Password</label>
          <input
            className="outline-blue-600 px-4 py-2 rounded bg-gray-100"
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={login.password}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <button type="submit" className="text-center w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            {load ? <Progress  /> : "Login"}
          </button>
        </div>
        <div className="text-shadow-md">
          New Here ? <NavLink to="/register" className="text-blue-600 underline">Register Your Shop</NavLink>
        </div>
      </form>
    </section>
  );
};

export default Login;
