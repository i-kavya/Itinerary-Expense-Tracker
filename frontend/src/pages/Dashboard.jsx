import React, { useState, useMemo } from "react";
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

  // 👇 Get unique categories from destination data
  const categories = useMemo(() => {
    const unique = new Set(destinationsData.map((d) => d.category));
    return ["All", ...Array.from(unique)];
  }, []);

  const filtered = destinationsData.filter(
    (dest) =>
      dest.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || dest.category === filter)
  );

  const handleCustomize = (destination) =>
    navigate("/customize", { state: { destination } });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 px-4 sm:px-8 py-10">
      {/* Top Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        {/* Search */}
        <div className="flex items-center bg-white shadow-md rounded-lg px-4 py-2 w-full md:w-2/3 transition focus-within:ring-2 focus-within:ring-blue-400">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-full text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Filter */}
        <select
          className="bg-white shadow-md rounded-lg px-4 py-2 w-full md:w-auto focus:ring-2 focus:ring-purple-400 transition"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Recommended Destinations
        </h2>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest) => (
              <TripCard
                key={dest.id}
                trip={dest}
                onCustomize={handleCustomize}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No destinations match your search.
          </p>
        )}
      </div>

      {/* Custom Trip Display */}
      {customTrip && (
        <div className="mt-16 space-y-8">
          <PieChart destination={customTrip} />
          <ItineraryCard itinerary={customTrip.itinerary || []} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
