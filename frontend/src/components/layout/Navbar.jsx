import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleProtectedClick = (path) => {
    if (isSignedIn) {
      navigate(path);
    } else {
      document.querySelector("#clerk-sign-in-trigger")?.click();
    }
  };

  return (
    <nav className="bg-blue-500 text-white px-6 py-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Travel Tracker</Link>
        </h1>

        <ul className="flex gap-6 text-lg items-center justify-center flex-1">
          {["Dashboard", "Itinerary", "Expenses"].map((label, i) => (
            <li
              key={label}
              className="hover:text-yellow-300 cursor-pointer"
              onClick={() =>
                handleProtectedClick(["/", "/trips", "/expenses"][i])
              }
            >
              {label}
            </li>
          ))}
        </ul>

        <div className="flex gap-4 items-center">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                id="clerk-sign-in-trigger"
                className="bg-white text-blue-500 px-4 py-1 rounded"
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
