import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-600">
          Ecommerce
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 font-medium text-gray-700">
          <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
          <li><Link to="/products" className="hover:text-indigo-600">Products</Link></li>
          <li><Link to="/about" className="hover:text-indigo-600">About</Link></li>
          <li><Link to="/contact" className="hover:text-indigo-600">Contact</Link></li>
        </ul>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-sm px-4 py-2 rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Sign Up
          </Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600 text-xl">
            🛒
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
