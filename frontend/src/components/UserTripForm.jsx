import React, { useState } from "react";

const UserTripForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "Custom",
    food: "",
    travel: "",
    accommodation: "",
    misc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const expenseBreakdown = {
      food: parseInt(formData.food || 0),
      travel: parseInt(formData.travel || 0),
      accommodation: parseInt(formData.accommodation || 0),
      misc: parseInt(formData.misc || 0),
    };

    const customTrip = {
      name: formData.name || "Custom Trip",
      category: formData.category,
      expenseBreakdown,
    };

    onSubmit(customTrip);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-xl mx-auto mt-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Plan Your Own Trip</h2>

      <input
        type="text"
        name="name"
        placeholder="Trip Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="food"
          placeholder="Food Expense"
          value={formData.food}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="travel"
          placeholder="Travel Expense"
          value={formData.travel}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="accommodation"
          placeholder="Accommodation Expense"
          value={formData.accommodation}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="misc"
          placeholder="Miscellaneous Expense"
          value={formData.misc}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Generate Expense Chart
      </button>
    </form>
  );
};

export default UserTripForm;
