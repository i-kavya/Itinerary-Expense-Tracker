import React from "react";

const ItineraryCard = ({ itinerary = [] }) => {
  if (!itinerary.length) return null;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 transition duration-300">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🗺️ Itinerary Plan
      </h2>
      <ul className="divide-y divide-gray-300">
        {itinerary.map((item, index) => (
          <li
            key={index}
            className="py-4 px-3 transition hover:bg-blue-50 rounded-lg"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
              <span className="text-lg font-semibold text-indigo-600">
                {item.day}
              </span>
              <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                {item.time}
              </span>
            </div>
            <p className="text-gray-800 text-sm sm:text-base pl-1">
              {item.activity || item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryCard;
