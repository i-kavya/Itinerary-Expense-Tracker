import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../utils/api";
import PieChart from "../components/charts/PieChart";
import ItineraryCard from "../components/trips/ItineraryCard";

const ItineraryPage = () => {
  const { id } = useParams();
  const { getWithAuth } = useApi();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      const allTrips = await getWithAuth("/trips");
      const target = allTrips.find((t) => t.id === id);
      setTrip(target);
    };
    fetchTrip();
  }, [id]);

  if (!trip) return <p className="text-center mt-10">Trip not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        {trip.name} – Itinerary & Expenses
      </h2>
      <PieChart destination={trip} />
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Trip Itinerary</h3>
        <ItineraryCard itinerary={trip.itinerary} />
      </div>
    </div>
  );
};

export default ItineraryPage;
