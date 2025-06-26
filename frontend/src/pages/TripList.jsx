import React, { useState, useEffect } from "react";

const TripList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userTrips")) || [];
    setTrips(stored);
  }, []);

  const handleComplete = (id) => {
    const updatedTrips = trips.map((trip) =>
      trip.id === id ? { ...trip, completed: true } : trip
    );
    setTrips(updatedTrips);
    localStorage.setItem("userTrips", JSON.stringify(updatedTrips));
    
    // Also update expenses
    const expenses = JSON.parse(localStorage.getItem("completedExpenses")) || [];
    const completedTrip = updatedTrips.find((trip) => trip.id === id);
    if (completedTrip && !expenses.find((e) => e.id === id)) {
      localStorage.setItem(
        "completedExpenses",
        JSON.stringify([...expenses, completedTrip])
      );
    }
  };

  const handleRevert = (id) => {
    const updatedTrips = trips.map((trip) =>
      trip.id === id ? { ...trip, completed: false } : trip
    );
    setTrips(updatedTrips);
    localStorage.setItem("userTrips", JSON.stringify(updatedTrips));

    // Remove from completedExpenses
    const updatedExpenses = (JSON.parse(localStorage.getItem("completedExpenses")) || [])
      .filter((t) => t.id !== id);
    localStorage.setItem("completedExpenses", JSON.stringify(updatedExpenses));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Saved Trips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trips.length === 0 ? (
          <p>No saved trips yet.</p>
        ) : (
          trips.map((trip) => (
            <div key={trip.id} className="bg-white shadow-md rounded p-4">
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
                    onClick={() => handleRevert(trip.id)}
                    className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
                  >
                    Revert Trip
                  </button>
                ) : (
                  <button
                    onClick={() => handleComplete(trip.id)}
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
