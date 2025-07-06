import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useApi } from "../utils/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const Expenses = () => {
  const [data, setData] = useState(null);
  const { getWithAuth } = useApi();

  useEffect(() => {
    getWithAuth("/expenses").then(setData);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
        <p className="text-lg text-gray-600 animate-pulse">
          Loading your expenses...
        </p>
      </div>
    );
  }

  const chartData = {
    labels: ["Food", "Stay", "Places"],
    datasets: [
      {
        data: [data.food, data.stay, data.places],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
        ],
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg p-6 sm:p-10 transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          Your Trip Expenses
        </h2>

        <div className="flex justify-center">
          <div className="w-full sm:w-3/4 md:w-2/3">
            <Pie data={chartData} />
          </div>
        </div>

        <div className="mt-8 text-xl font-semibold text-center text-green-600">
          Total Spent: ₹{data.total}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
