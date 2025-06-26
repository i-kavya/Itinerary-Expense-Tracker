import React from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white px-6 py-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Travel Tracker</Link>
        </h1>

        <ul className="flex gap-6 text-lg items-center">
          <li className="hover:text-yellow-300 cursor-pointer">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="hover:text-yellow-300 cursor-pointer">
            <Link to="/trips">Itinerary</Link>
          </li>
          <li className="hover:text-yellow-300 cursor-pointer">
            <Link to="/expenses">Expenses</Link>
          </li>

          <SignedOut>
            <li className="hover:text-yellow-300 cursor-pointer">
              <SignInButton mode="modal" />
            </li>
          </SignedOut>

          <SignedIn>
            <li>
              <UserButton afterSignOutUrl="/sign-in" />
            </li>
          </SignedIn>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
