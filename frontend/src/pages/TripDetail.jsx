import React from "react";
import { useParams } from "react-router-dom";
import PieChart from "../components/PieChart";
import ItineraryCard from "../components/ItineraryCard";

const ItineraryPage = () => {
  const { id } = useParams();
  const trips = JSON.parse(localStorage.getItem("userTrips")) || [];
  const trip = trips.find((t) => t.id === id);

  if (!trip) return <p className="text-center mt-10">Trip not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">{trip.name} – Itinerary & Expenses</h2>

      {/* ✅ Pie Chart for this destination */}
      <PieChart destination={trip} />

      {/* ✅ Itinerary Details */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Trip Itinerary</h3>
        <ItineraryCard itinerary={trip.itinerary} />
      </div>
    </div>
  );
};

export default ItineraryPage;
