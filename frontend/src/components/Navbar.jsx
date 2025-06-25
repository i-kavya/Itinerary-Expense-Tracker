import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white px-6 py-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Travel Tracker</h1>
        <ul className="flex gap-6 text-lg">
          <li className="hover:text-yellow-300 cursor-pointer">Dashboard</li>
          <li className="hover:text-yellow-300 cursor-pointer">Itinerary</li>
          <li className="hover:text-yellow-300 cursor-pointer">Expenses</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
