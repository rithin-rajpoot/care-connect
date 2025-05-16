// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white z-10 sticky top-0">
      {/* Logo and App Name */}
      <div className="flex items-center space-x-2">
        <div className="bg-blue-500 p-2 rounded-md">
            logo
        </div>
        <span className="text-xl font-semibold text-gray-900">CareConnect</span>
      </div>

      {/* Navigation Links */}
      <div className="md:flex space-x-8 hidden">
        <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
        <Link to="/find-hospitals" className="text-gray-600 hover:text-black">Find Hospitals</Link>
        <Link to="/how-it-works" className="text-gray-600 hover:text-black">How It Works</Link>
      </div>

      {/* Auth Buttons */}
      <div className="md:flex space-x-3 hidden">
        <Link to="/patient-login" className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">Login</Link>
        <Link to="/patient-register" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
