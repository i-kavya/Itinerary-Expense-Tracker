import React from "react";

const Input = ({ label, ...props }) => (
  <div className="mb-6">
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
    )}
    <input
      {...props}
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
    />
  </div>
);

export default Input;
