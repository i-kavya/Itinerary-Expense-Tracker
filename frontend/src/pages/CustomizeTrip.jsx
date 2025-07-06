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

  if (!destination) return <p>No destination selected.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">
        Customize Your Trip to {destination.name}
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <label>
          People
          <input
            type="number"
            min={1}
            value={people}
            onChange={(e) => setPeople(+e.target.value)}
            className="w-full border p-2 rounded"
          />
        </label>
        <label>
          Nights
          <input
            type="number"
            min={1}
            value={nights}
            onChange={(e) => setNights(+e.target.value)}
            className="w-full border p-2 rounded"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2">Hotel</label>
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
            <h4 className="font-semibold">Day {i + 1}</h4>
            {dailyActivities.map((act) => (
              <label key={act.name} className="block ml-2 text-sm">
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
            <div className="ml-4 mt-2">
              <label className="font-semibold">Meals:</label>
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

      <Button onClick={handleSave}>Save My Itinerary</Button>
    </div>
  );
};

export default CustomizeTrip;
