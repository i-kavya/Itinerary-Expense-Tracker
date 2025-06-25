import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ destination }) => {
  console.log("🎯 [PieChart] destination:", destination); // ✅ moved here

  if (!destination || !destination.expenseBreakdown) return null;

  const { food, travel, accommodation, misc } = destination.expenseBreakdown;

  const data = {
    labels: ["Food", "Travel", "Accommodation", "Misc"],
    datasets: [
      {
        label: "Expense Breakdown",
        data: [food, travel, accommodation, misc],
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-700">
        Expense Breakdown for {destination.name}
      </h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
