import React from "react";
import Button from "../common/Button";

const TripCard = ({ trip, onCustomize }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <img
      src={trip.image}
      alt={trip.name}
      className="w-full h-40 object-cover rounded-md mb-3"
    />
    <h2 className="text-xl font-semibold">{trip.name}</h2>
    <p className="text-sm text-gray-600">{trip.description}</p>
    <p className="text-sm mt-2">
      <strong>Category:</strong> {trip.category}
    </p>
    <p className="text-sm">
      <strong>Estimated Cost:</strong> ₹{trip.cost}
    </p>
    <Button
      className="mt-3 bg-green-500 hover:bg-green-600"
      onClick={() => onCustomize(trip)}
    >
      Customize Expense
    </Button>
  </div>
);

export default TripCard;
