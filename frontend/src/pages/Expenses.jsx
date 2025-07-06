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

  if (!data) return <p>Loading...</p>;

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
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-6">
        Your Trip Expenses
      </h2>
      <Pie data={chartData} />
      <div className="mt-6 text-lg font-semibold text-center">
        Total: ₹{data.total}
      </div>
    </div>
  );
};

export default Expenses;
