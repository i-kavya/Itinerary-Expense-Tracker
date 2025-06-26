import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
  const { state } = useLocation();
  const destination = state?.destination;
  const navigate = useNavigate();

  const [people, setPeople] = useState(1);
  const [nights, setNights] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState(hotelOptions[0]);
  const [activitySelections, setActivitySelections] = useState({});
  const [totalExpense, setTotalExpense] = useState(0);
  const [foodCost, setFoodCost] = useState(0);
  const [activityCost, setActivityCost] = useState(0);

  useEffect(() => {
    let actCost = 0;
    let fCost = 0;

    Object.keys(activitySelections).forEach((day) => {
      activitySelections[day].forEach((act) => {
        if (foodOptions.includes(act)) {
          fCost += 200;
        } else {
          const activity = dailyActivities.find((a) => a.name === act);
          actCost += activity ? activity.cost : 0;
        }
      });
    });

    const hotelCost = selectedHotel.pricePerNight * nights * people;
    const travelCost = destination?.expenseBreakdown?.travel || 0;
    const total = hotelCost + fCost + actCost + travelCost;

    setFoodCost(fCost);
    setActivityCost(actCost);
    setTotalExpense(total);
  }, [people, nights, selectedHotel, activitySelections]);

  const handleActivityChange = (day, activityName, checked) => {
    setActivitySelections((prev) => {
      const current = prev[day] || [];
      if (checked) {
        return { ...prev, [day]: [...current, activityName] };
      } else {
        return {
          ...prev,
          [day]: current.filter((a) => a !== activityName),
        };
      }
    });
  };

  const handleSaveItinerary = () => {
    const hotelCost = selectedHotel.pricePerNight * nights * people;
    const travelCost = destination?.expenseBreakdown?.travel || 0;

    const newTrip = {
      id: uuidv4(),
      name: destination.name + " (Customized)",
      category: destination.category,
      cost: totalExpense,
      image: destination.image,
      expenseBreakdown: {
        food: foodCost,
        travel: travelCost,
        accommodation: hotelCost,
        misc: activityCost,
      },
      itinerary: Array.from({ length: nights }, (_, i) => ({
        day: `Day ${i + 1}`,
        location: destination.name,
        description:
          (activitySelections[`Day ${i + 1}`] || []).join(", ") ||
          "No activities selected",
      })),
    };

    const existing = JSON.parse(localStorage.getItem("userTrips")) || [];
    localStorage.setItem("userTrips", JSON.stringify([...existing, newTrip]));
    navigate("/trip/" + newTrip.id);
  };

  if (!destination) return <p>No destination selected.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">
        Customize Your Trip to {destination.name}
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium">Number of People</label>
          <input
            type="number"
            min={1}
            value={people}
            onChange={(e) => setPeople(parseInt(e.target.value))}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Days/Nights</label>
          <input
            type="number"
            min={1}
            value={nights}
            onChange={(e) => setNights(parseInt(e.target.value))}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2">Choose Hotel</label>
        {hotelOptions.map((hotel) => (
          <label key={hotel.name} className="block">
            <input
              type="radio"
              name="hotel"
              checked={selectedHotel.name === hotel.name}
              onChange={() => setSelectedHotel(hotel)}
              className="mr-2"
            />
            {hotel.name} (₹{hotel.pricePerNight}/night)
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Customize Each Day</h3>
        {Array.from({ length: nights }, (_, i) => (
          <div key={i} className="mb-4">
            <h4 className="font-semibold mb-1">Day {i + 1}</h4>
            {dailyActivities.map((activity) => (
              <label key={activity.name} className="block text-sm ml-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleActivityChange(
                      `Day ${i + 1}`,
                      activity.name,
                      e.target.checked
                    )
                  }
                  className="mr-2"
                />
                {activity.name} (₹{activity.cost})
              </label>
            ))}
            <div className="ml-4 mt-2">
              <label className="font-semibold">Select Meals:</label>
              {foodOptions.map((meal) => (
                <label key={meal} className="block text-sm ml-2">
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
        ))}
      </div>

      <div className="text-xl font-bold text-green-600 mb-4">
        Estimated Total Expense: ₹{totalExpense}
      </div>

      <button
        onClick={handleSaveItinerary}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Save My Itinerary
      </button>
    </div>
  );
};

export default CustomizeTrip;
