import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLogIn, Logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(isLogIn);

  useEffect(() => {
    setIsLoggedIn(isLogIn);
  }, [isLogIn]);

  return (
    <header className="bg-black/85 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div
          onClick={() => (isLogIn ? navigate("/dashboard") : navigate("/"))}
          className="cursor-pointer group"
        >
          <h1 className="text-3xl font-bold text-white tracking-wide group-hover:text-gray-300 transition">
            IMS
          </h1>
          <p className="text-xs text-gray-400 group-hover:text-gray-300 transition">
            Inventory Management System
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8">
          <NavLink
            to="/contact"
            className="text-lg font-medium text-white hover:text-gray-300 transition"
          >
            Contact
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/"
              onClick={Logout}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition shadow-md"
            >
              Logout
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
