import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { useState, useEffect } from "react";
const Navbar = () => {
  const navigate = useNavigate();

  const { isLogIn, Logout } = useAuth(); // Destructuring isLogIn from useAuth hook
  const [isLoggedIn, setIsLoggedIn] = useState(isLogIn); // Local state to manage login status

  useEffect(() => {
    setIsLoggedIn(isLogIn); // Update local state when isLogIn changes
  }, [isLogIn]);
  return (
    <section className="bg-black/90 shadow-md">
      <nav className="flex justify-around items-center h-20 ">
        <div
          onClick={() => (isLogIn ? navigate("/dashboard") : navigate("/"))}
          className="flex flex-col justify-center items-center cursor-pointer"
        >
          <h1 className="text-2xl font-semibold text-zinc-50">IMS</h1>
          <h3 className="text-sm font-semibold text-gray-500">
            Inventory Management System
          </h3>
        </div>

        <div>
          <NavLink to="/contact" className="text-xl font-semibold">
            <p className="text-zinc-50">Contact</p>
          </NavLink>
          {isLoggedIn ? (
            <NavLink to="/" onClick={Logout}>
              <p className="text-zinc-50">Logout</p>
            </NavLink>
          ) : (
            ""
          )}
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
