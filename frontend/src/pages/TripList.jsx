import React, { useState, useEffect } from "react";
import { useApi } from "../utils/api";
import { FiCheckCircle, FiRotateCcw, FiTrash2 } from "react-icons/fi";

const TripList = () => {
  const { getWithAuth, patchWithAuth, deleteWithAuth } = useApi();
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
    setTrips((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed: true } : t))
    );
  };

  const handleRevert = async (id) => {
    await patchWithAuth(`/trips/${id}/complete`, { completed: false });
    setTrips((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed: false } : t))
    );
  };

  const handleDelete = async (id) => {
    await deleteWithAuth(`/trips/${id}`);
    setTrips((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-10">
          Your Saved Trips
        </h2>

        {trips.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No trips saved yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className={`rounded-xl shadow-xl p-6 transition-all duration-300 transform hover:scale-105 ${
                  trip.completed
                    ? "bg-green-50 border border-green-200"
                    : "bg-white border"
                }`}
              >
                <h3 className="text-xl font-bold text-gray-800">{trip.name}</h3>
                <p className="text-sm text-gray-500 mb-2 capitalize">
                  {trip.category}
                </p>

                <p className="text-md font-semibold text-gray-700 mt-2">
                  Total Expense: ₹{trip.cost}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  {trip.completed ? (
                    <button
                      onClick={() => handleRevert(trip._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                    >
                      <FiRotateCcw /> Revert
                    </button>
                  ) : (
                    <button
                      onClick={() => handleComplete(trip._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      <FiCheckCircle /> Mark Complete
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripList;
