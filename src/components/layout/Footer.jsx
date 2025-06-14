import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        
        {/* Subscribe */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Exclusive</h2>
          <p className="mb-2">Subscribe</p>
          <p className="mb-4 text-sm text-gray-300">Get 10% off your first order</p>
          <form className="flex items-center border border-white rounded px-2 py-1">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-black text-white placeholder-gray-400 focus:outline-none w-full py-1"
            />
            <button type="submit" className="ml-2 text-white">
              <FaPaperPlane />
            </button>
          </form>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Support</h2>
          <p className="text-sm text-gray-300 mb-1">111 Bijoy sarani, Dhaka,</p>
          <p className="text-sm text-gray-300 mb-1">DH 1515, Bangladesh.</p>
          <p className="text-sm text-gray-300 mb-1">exclusive@gmail.com</p>
          <p className="text-sm text-gray-300">+88015-88888-9999</p>
        </div>

        {/* Account */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Account</h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><Link to="/profile">My Account</Link></li>
            <li><Link to="/login">Login / Register</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/products">Shop</Link></li>
          </ul>
        </div>

        {/* Quick Link */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Quick Link</h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms Of Use</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex items-start space-x-4 mt-2 lg:mt-0">
          <a href="#" className="text-white hover:text-indigo-400 text-xl"><FaFacebookF /></a>
          <a href="#" className="text-white hover:text-indigo-400 text-xl"><FaTwitter /></a>
          <a href="#" className="text-white hover:text-indigo-400 text-xl"><FaInstagram /></a>
          <a href="#" className="text-white hover:text-indigo-400 text-xl"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
}
