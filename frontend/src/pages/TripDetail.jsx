import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../utils/api";
import PieChart from "../components/charts/PieChart";
import ItineraryCard from "../components/trips/ItineraryCard";

const ItineraryPage = () => {
  const { id } = useParams();
  const { getWithAuth } = useApi();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      const allTrips = await getWithAuth("/trips");
      const target = allTrips.find((t) => t.id === id);
      setTrip(target);
      setLoading(false);
    };
    fetchTrip();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
        <p className="text-lg text-gray-600 animate-pulse">
          Loading trip data...
        </p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-yellow-100">
        <p className="text-xl font-medium text-gray-700">Trip not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-700 mb-8">
          {trip.name} – Itinerary & Expenses
        </h2>

        <PieChart destination={trip} />

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Trip Itinerary
          </h3>
          <ItineraryCard itinerary={trip.itinerary} />
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
