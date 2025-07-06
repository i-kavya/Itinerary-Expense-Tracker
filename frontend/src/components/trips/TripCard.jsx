import React from "react";
import Button from "../common/Button";

const TripCard = ({ trip, onCustomize }) => (
  <div className="bg-white/90 backdrop-blur-lg p-5 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl duration-300 border border-gray-200">
    <div className="overflow-hidden rounded-xl mb-4">
      <img
        src={trip.image}
        alt={trip.name}
        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>

    <h2 className="text-xl font-bold text-blue-700 mb-1">{trip.name}</h2>
    <p className="text-gray-600 text-sm mb-2 line-clamp-3">
      {trip.description}
    </p>

    <div className="text-sm text-gray-700 space-y-1">
      <p>
        <span className="font-medium text-gray-800">Category:</span>{" "}
        {trip.category}
      </p>
      <p>
        <span className="font-medium text-gray-800">Estimated Cost:</span> ₹
        {trip.cost}
      </p>
    </div>

    <Button
      className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-md"
      onClick={() => onCustomize(trip)}
    >
      Customize Expense
    </Button>
  </div>
);

export default TripCard;
