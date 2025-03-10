import React from "react";
import { NavLink } from "react-router-dom";
import { Shield, Menu } from "lucide-react";

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">AI Safety</span>
            </NavLink>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              ["Home", "/"],
              ["Live Map", "/live-map"],
              ["Tracking History", "/tracking-history"],
              ["Safety Alerts", "/safety-alerts"],
              ["Device Pairing", "/device-pairing"], // ✅ Fixed syntax
              ["Help", "/help"],
              ["Privacy", "/privacy"],
            ].map(([title, url]) => (
              <NavLink
                key={url}
                to={url}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                  }`
                }
              >
                {title}
              </NavLink>
            ))}
          </div>

          {/* Right Side - Login Button */}
          <div>
            <NavLink
              to="/login"
              className="bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700 transition font-semibold"
            >
              Login
            </NavLink>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <Menu className="w-6 h-6 text-gray-900 cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
