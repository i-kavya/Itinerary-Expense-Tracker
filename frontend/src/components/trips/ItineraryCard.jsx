import React from "react";

const ItineraryCard = ({ itinerary = [] }) => {
  if (!itinerary.length) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
        Itinerary Plan
      </h2>
      <ul className="divide-y divide-gray-200">
        {itinerary.map((item, index) => (
          <li key={index} className="py-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-blue-600 font-semibold">{item.day}</span>
              <span className="text-sm text-gray-500">{item.time}</span>
            </div>
            <p className="text-gray-800 ml-1">
              {item.activity || item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryCard;
