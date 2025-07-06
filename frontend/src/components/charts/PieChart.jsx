import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ destination }) => {
  if (!destination || !destination.expenseBreakdown) return null;

  const { food, travel, accommodation, misc } = destination.expenseBreakdown;

  const data = {
    labels: ["Food", "Travel", "Accommodation", "Misc"],
    datasets: [
      {
        label: "Expense Breakdown",
        data: [food, travel, accommodation, misc],
        backgroundColor: [
          "#4ade80", // Green - Food
          "#60a5fa", // Blue - Travel
          "#facc15", // Yellow - Accommodation
          "#f472b6", // Pink - Misc
        ],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151", // Tailwind's gray-700
          font: {
            size: 14,
            family: "Inter, sans-serif",
          },
          padding: 20,
          boxWidth: 20,
        },
      },
      tooltip: {
        backgroundColor: "#1f2937", // dark tooltip
        titleColor: "#f9fafb",
        bodyColor: "#f3f4f6",
        cornerRadius: 6,
        padding: 10,
      },
    },
    animation: {
      animateRotate: true,
      duration: 1000,
      easing: "easeOutBounce",
    },
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 py-6 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-xl rounded-xl border border-gray-200 transition-transform hover:scale-[1.02]">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 tracking-wide">
        💸 Expense Breakdown for{" "}
        <span className="text-blue-500">{destination.name}</span>
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
