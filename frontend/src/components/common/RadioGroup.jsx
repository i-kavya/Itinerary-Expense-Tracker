import React from "react";

const RadioGroup = ({ label, name, options, selected, onChange }) => (
  <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
    <p className="font-semibold text-gray-800 mb-3">{label}</p>
    {options.map((opt) => (
      <label
        key={opt.name}
        className="flex items-center mb-2 text-sm text-gray-700 cursor-pointer"
      >
        <input
          type="radio"
          name={name}
          checked={selected.name === opt.name}
          onChange={() => onChange(opt)}
          className="accent-indigo-600 w-4 h-4 mr-3"
        />
        {opt.name}{" "}
        <span className="ml-1 text-gray-500">(₹{opt.pricePerNight}/night)</span>
      </label>
    ))}
  </div>
);

export default RadioGroup;
