import React from "react";
import { FaInstagram, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black/90 text-gray-300 mt-10 py-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 grid-cols-1 gap-10">

        {/* About */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Created By</h2>
          <p className="text-gray-400 text-lg font-medium">Ankit Kumar</p>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Social Links</h2>
          <div className="flex gap-5 text-2xl">
            <a
              href="https://instagram.com/your_username"
              target="_blank"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://github.com/your_username"
              target="_blank"
              className="hover:text-gray-100 transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/your_username"
              target="_blank"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://wa.me/917091060239"
              target="_blank"
              className="hover:text-green-400 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Inventory Management System.
          </p>
          <p className="text-gray-500 text-sm">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
