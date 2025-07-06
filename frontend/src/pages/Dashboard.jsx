import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import destinationsData from "../data/destinations";
import TripCard from "../components/trips/TripCard";
import PieChart from "../components/charts/PieChart";
import ItineraryCard from "../components/trips/ItineraryCard";


const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [customTrip, setCustomTrip] = useState(null);
  const navigate = useNavigate();

  const filtered = destinationsData.filter(
    (dest) =>
      dest.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || dest.category === filter)
  );

  const handleCustomize = (destination) =>
    navigate("/customize", { state: { destination } });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center bg-white shadow-md rounded-md px-4 py-2 w-full md:w-1/2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-full"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dest) => (
          <TripCard key={dest.id} trip={dest} onCustomize={handleCustomize} />
        ))}
      </div>



      {customTrip && (
        <>
          <PieChart destination={customTrip} />
          <ItineraryCard itinerary={customTrip.itinerary || []} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
