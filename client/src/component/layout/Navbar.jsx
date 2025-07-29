// src/component/layout/Navbar.js
// This component renders the navigation bar with responsive design
// It dynamically shows links based on authentication state (logged-in or not).

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  // Access user info and logout function from AuthContext
  const { user, logout } = useAuth();
  
  // For navigation after logout
  const navigate = useNavigate();
  
  // State to control mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  // Handle logout functionality
  const handleLogout = () => {
    logout();
    setIsOpen(false); // Close mobile menu after logout
    navigate("/login");
    toast.success("You have been logged out.");
  };

  // Reusable link styling classes
  const linkClass =
    "text-gray-500 hover:text-gray-900 transition-colors duration-300";
  const activeLinkClass = "text-gray-900 font-semibold";
  const mobileLinkClass = "block px-3 py-2 rounded-md text-base font-medium";

  // Function to style desktop nav links based on active state
  const navLinkStyles = ({ isActive }) =>
    isActive ? `${linkClass} ${activeLinkClass}` : linkClass;

  // Function to style mobile nav links based on active state
  const mobileNavLinkStyles = ({ isActive }) =>
    isActive
      ? `${mobileLinkClass} ${activeLinkClass} bg-gray-100`
      : `${mobileLinkClass} ${linkClass}`;

  return (
    <nav className="fixed w-full bg-white/80 shadow-sm z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation container */}
        <div className="flex items-center justify-between h-16">
          
          {/* Brand / Logo */}
          <div className="flex-shrink-0">
            <NavLink
              to={user ? "/dashboard" : "/"}
              className="text-2xl font-bold text-gray-800"
            >
              XpenseMate
            </NavLink>
          </div>

          {/* Desktop navigation links (hidden on mobile) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {user ? (
                <>
                  {/* Links visible only for logged-in users */}
                  <NavLink to="/dashboard" className={navLinkStyles}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/transactions" className={navLinkStyles}>
                    Transactions
                  </NavLink>
                  {/* Logout button */}
                  <button
                    onClick={handleLogout}
                    className="ml-4 bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    Logout
                  </button>
                  {/* User profile icon */}
                  <div className="ml-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-white">
                      <span className="text-sm font-medium text-gray-600">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Links visible for guests (not logged in) */}
                  <NavLink to="/login" className={navLinkStyles}>
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu toggle button (hamburger icon) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-200 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                // Close icon
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                {/* Mobile links for logged-in users */}
                <NavLink
                  to="/dashboard"
                  className={mobileNavLinkStyles}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/transactions"
                  className={mobileNavLinkStyles}
                  onClick={() => setIsOpen(false)}
                >
                  Transactions
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Mobile links for guests */}
                <NavLink
                  to="/login"
                  className={mobileNavLinkStyles}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={mobileNavLinkStyles}
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
