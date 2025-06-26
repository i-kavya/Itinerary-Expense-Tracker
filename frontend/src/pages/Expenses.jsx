import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Expenses = () => {
  const completedTrips = JSON.parse(localStorage.getItem("completedExpenses")) || [];

  let food = 0, stay = 0, places = 0;

  completedTrips.forEach((trip) => {
    food += trip.expenseBreakdown.food || 0;
    stay += trip.expenseBreakdown.accommodation || 0;
    places += (trip.expenseBreakdown.misc || 0) + (trip.expenseBreakdown.travel || 0);
  });

  const data = {
    labels: ["Food", "Stay", "Places"],
    datasets: [
      {
        label: "Total Expenses",
        data: [food, stay, places],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-6">
        Expenses from Completed Trips
      </h2>
      <Pie data={data} />
      <div className="mt-6 text-lg font-semibold text-center">
        Total: ₹{food + stay + places}
      </div>
    </div>
  );
};

export default Expenses;
