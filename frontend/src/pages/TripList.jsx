// src/pages/TripList.jsx
import React from "react";

const TripList = () => {
  const trips = JSON.parse(localStorage.getItem("userTrips")) || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Saved Trips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trips.length === 0 ? (
          <p>No saved trips yet.</p>
        ) : (
          trips.map((trip, idx) => (
            <div key={idx} className="bg-white shadow-md rounded p-4">
              <h3 className="text-lg font-semibold">{trip.name}</h3>
              <p className="text-sm text-gray-600">{trip.category}</p>
              <p className="text-sm mt-2">
                Total: ₹
                {trip.expenseBreakdown.food +
                  trip.expenseBreakdown.travel +
                  trip.expenseBreakdown.accommodation +
                  trip.expenseBreakdown.misc}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TripList;
