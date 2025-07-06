import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProtectedClick = (path) => {
    if (isSignedIn) {
      navigate(path);
    } else {
      document.querySelector("#clerk-sign-in-trigger")?.click();
    }
    setMenuOpen(false);
  };

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Itinerary", path: "/trips" },
    { label: "Expenses", path: "/expenses" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-md border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold text-indigo-700 tracking-tight"
        >
          Travel<span className="text-violet-500">Tracker</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-lg font-medium text-gray-800">
          {navItems.map((item) => (
            <li
              key={item.label}
              onClick={() => handleProtectedClick(item.path)}
              className="cursor-pointer hover:text-indigo-600 transition duration-300"
            >
              {item.label}
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                id="clerk-sign-in-trigger"
                className="bg-indigo-600 text-white px-4 py-1.5 rounded-md shadow hover:bg-indigo-700 transition duration-300"
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            {menuOpen ? (
              <XIcon className="w-6 h-6 text-indigo-700" />
            ) : (
              <MenuIcon className="w-6 h-6 text-indigo-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white/60 backdrop-blur-md px-6 py-4 space-y-4"
        >
          {navItems.map((item) => (
            <div
              key={item.label}
              onClick={() => handleProtectedClick(item.path)}
              className="text-lg font-medium text-gray-800 hover:text-indigo-600 cursor-pointer transition duration-300"
            >
              {item.label}
            </div>
          ))}
          <div className="flex justify-start">
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  id="clerk-sign-in-trigger"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition duration-300"
                >
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
