import React, { useState, useEffect } from "react";
import { useApi } from "../utils/api";

const TripList = () => {
  const { getWithAuth, patchWithAuth } = useApi();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const res = await getWithAuth("/trips");
      setTrips(res);
    };
    fetchTrips();
  }, []);

  const handleComplete = async (id) => {
    await patchWithAuth(`/trips/${id}/complete`, { completed: true });
    const updated = trips.map((t) =>
      t._id === id ? { ...t, completed: true } : t
    );
    setTrips(updated);
  };

  const handleRevert = async (id) => {
    await patchWithAuth(`/trips/${id}/complete`, { completed: false });
    const updated = trips.map((t) =>
      t._id === id ? { ...t, completed: false } : t
    );
    setTrips(updated);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Trips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trips.length === 0 ? (
          <p>No trips saved yet.</p>
        ) : (
          trips.map((trip) => (
            <div key={trip._id} className="bg-white shadow-md rounded p-4">
              <h3 className="text-lg font-semibold">{trip.name}</h3>
              <p className="text-sm text-gray-600">{trip.category}</p>
              <p className="text-sm mt-2">
                Total: ₹
                {trip.expenseBreakdown.food +
                  trip.expenseBreakdown.travel +
                  trip.expenseBreakdown.accommodation +
                  trip.expenseBreakdown.misc}
              </p>
              <div className="mt-4">
                {trip.completed ? (
                  <button
                    onClick={() => handleRevert(trip._id)}
                    className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
                  >
                    Revert Trip
                  </button>
                ) : (
                  <button
                    onClick={() => handleComplete(trip._id)}
                    className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
                  >
                    Trip Completed
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TripList;
