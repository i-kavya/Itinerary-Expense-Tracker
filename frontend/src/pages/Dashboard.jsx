import React, { useState } from "react";
import destinationsData from "../data/destinations";
import { FaSearch } from "react-icons/fa";
import PieChart from "../components/PieChart";
import ItineraryCard from "../components/ItineraryCard";
import UserTripForm from "../components/UserTripForm";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [customTrip, setCustomTrip] = useState(null);
  const navigate = useNavigate();

  <UserTripForm onSubmit={setCustomTrip} />;
  const filteredDestinations = destinationsData.filter(
    (dest) =>
      dest.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || dest.category === filter)
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 px-6 py-8">
      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center bg-white shadow-md rounded-md px-4 py-2 w-full md:w-1/2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search destinations..."
            className="outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="mt-4 md:mt-0 md:ml-4 px-4 py-2 rounded-md shadow-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Beach">Beach</option>
          <option value="Mountain">Mountain</option>
          <option value="City">City</option>
        </select>
      </div>

      {/* Destination Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((dest) => (
          <div key={dest.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h2 className="text-xl font-semibold">{dest.name}</h2>
            <p className="text-sm text-gray-600">{dest.description}</p>
            <p className="mt-2 text-sm">
              <span className="font-semibold">Category:</span> {dest.category}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Estimated Cost:</span> ₹
              {dest.cost}
            </p>
            <button
              onClick={() =>
                navigate(`/customize`, { state: { destination: dest } })
              }
              className="mt-3 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Customize Expense
            </button>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      {selectedDestination && (
        <div className="mt-10">
          <PieChart destination={selectedDestination} />
          <ItineraryCard itinerary={selectedDestination.itinerary} />
          {customTrip && <PieChart destination={customTrip} />}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
