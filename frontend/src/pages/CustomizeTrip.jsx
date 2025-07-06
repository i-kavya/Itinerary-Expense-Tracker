import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useApi } from "../utils/api";
import Button from "../components/common/Button";

const hotelOptions = [
  { name: "Budget Stay", pricePerNight: 1000 },
  { name: "Comfort Inn", pricePerNight: 2500 },
  { name: "Luxury Resort", pricePerNight: 5000 },
];

const dailyActivities = [
  { name: "Sightseeing", cost: 1000 },
  { name: "Adventure Sports", cost: 2000 },
  { name: "Local Food Tour", cost: 800 },
  { name: "Museum Visit", cost: 500 },
];

const foodOptions = ["Breakfast", "Lunch", "Dinner"];

const CustomizeTrip = () => {
  const { postWithAuth } = useApi();
  const { state } = useLocation();
  const navigate = useNavigate();
  const destination = state?.destination;

  const [people, setPeople] = useState(1);
  const [nights, setNights] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState(hotelOptions[0]);
  const [activitySelections, setActivitySelections] = useState({});
  const [foodCost, setFoodCost] = useState(0);
  const [activityCost, setActivityCost] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    let food = 0;
    let act = 0;

    Object.values(activitySelections)
      .flat()
      .forEach((actName) => {
        if (foodOptions.includes(actName)) {
          food += 200;
        } else {
          const activity = dailyActivities.find((a) => a.name === actName);
          act += activity?.cost || 0;
        }
      });

    const hotelCost = selectedHotel.pricePerNight * nights * people;
    const travelCost = destination?.expenseBreakdown?.travel || 0;
    const total = hotelCost + food + act + travelCost;

    setFoodCost(food);
    setActivityCost(act);
    setTotalExpense(total);
  }, [people, nights, selectedHotel, activitySelections]);

  const handleActivityChange = (day, name, checked) => {
    setActivitySelections((prev) => {
      const current = prev[day] || [];
      return {
        ...prev,
        [day]: checked ? [...current, name] : current.filter((a) => a !== name),
      };
    });
  };

  const handleSave = async () => {
    const hotelCost = selectedHotel.pricePerNight * nights * people;
    const travelCost = destination?.expenseBreakdown?.travel || 0;

    const itinerary = Array.from({ length: nights }, (_, i) => ({
      day: `Day ${i + 1}`,
      location: destination.name,
      description:
        (activitySelections[`Day ${i + 1}`] || []).join(", ") ||
        "No activities selected",
    }));

    const newTrip = {
      id: uuidv4(),
      name: destination.name + " (Customized)",
      category: destination.category,
      cost: totalExpense,
      image: destination.image,
      completed: false,
      expenseBreakdown: {
        food: foodCost,
        travel: travelCost,
        accommodation: hotelCost,
        misc: activityCost,
      },
      itinerary,
    };

    await postWithAuth("/trips", newTrip);
    navigate("/trips");
  };

  if (!destination)
    return (
      <p className="text-center text-gray-600">No destination selected.</p>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Customize Your Trip to {destination.name}
      </h2>

      {/* People & Nights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of People
          </label>
          <input
            type="number"
            min={1}
            value={people}
            onChange={(e) => setPeople(+e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Nights
          </label>
          <input
            type="number"
            min={1}
            value={nights}
            onChange={(e) => setNights(+e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Hotel Options */}
      <div className="mb-8">
        <p className="text-lg font-semibold text-gray-800 mb-2">Choose Hotel</p>
        <div className="space-y-2">
          {hotelOptions.map((hotel) => (
            <label
              key={hotel.name}
              className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 transition"
            >
              <input
                type="radio"
                name="hotel"
                checked={selectedHotel.name === hotel.name}
                onChange={() => setSelectedHotel(hotel)}
                className="mr-3"
              />
              <span>
                {hotel.name} (₹{hotel.pricePerNight}/night)
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Daily Activity Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Customize Each Day
        </h3>
        {Array.from({ length: nights }, (_, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-4 mb-4 border">
            <h4 className="font-medium text-blue-600 mb-2">Day {i + 1}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {dailyActivities.map((act) => (
                <label
                  key={act.name}
                  className="text-sm text-gray-700 flex items-center"
                >
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleActivityChange(
                        `Day ${i + 1}`,
                        act.name,
                        e.target.checked
                      )
                    }
                    className="mr-2"
                  />
                  {act.name} (₹{act.cost})
                </label>
              ))}
            </div>
            <div className="mt-3">
              <p className="text-sm font-medium mb-1">Meals:</p>
              <div className="flex flex-wrap gap-3">
                {foodOptions.map((meal) => (
                  <label
                    key={meal}
                    className="text-sm text-gray-700 flex items-center"
                  >
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleActivityChange(
                          `Day ${i + 1}`,
                          meal,
                          e.target.checked
                        )
                      }
                      className="mr-2"
                    />
                    {meal} (₹200)
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Cost */}
      <div className="text-xl font-bold text-green-600 mb-6 text-center">
        Estimated Total Expense: ₹{totalExpense}
      </div>

      {/* Save Button */}
      <div className="text-center">
        <Button onClick={handleSave}>Save My Itinerary</Button>
      </div>
    </div>
  );
};

export default CustomizeTrip;
