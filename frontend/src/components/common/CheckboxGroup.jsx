import React from "react";

const CheckboxGroup = ({ day, options, onChange }) => (
  <div className="mb-5 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <p className="text-base font-semibold text-gray-800 mb-3">{day}</p>
    {options.map((item) => (
      <label
        key={item.name}
        className="flex items-center mb-2 text-sm text-gray-700"
      >
        <input
          type="checkbox"
          onChange={(e) => onChange(day, item.name, e.target.checked)}
          className="accent-blue-600 w-4 h-4 mr-3 rounded border-gray-300 focus:ring-2 focus:ring-blue-400"
        />
        {item.name}{" "}
        <span className="ml-1 text-gray-500">(₹{item.cost || 200})</span>
      </label>
    ))}
  </div>
);

export default CheckboxGroup;
