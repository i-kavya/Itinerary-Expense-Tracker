import manali from "../assets/manali.jpeg";
import goa from "../assets/goa.jpeg";
import delhi from "../assets/delhi.jpeg";
import jaipur from "../assets/jaipur.jpeg";
import ladakh from "../assets/ladakh.jpeg";
import mumbai from "../assets/mumbai.jpeg"

const destinationsData = [
  {
    id: 1,
    name: "Manali",
    category: "Mountain",
    cost: 15000,
    description: "Scenic hill station in Himachal Pradesh.",
    image: manali,
    expenseBreakdown: {
      food: 3000,
      travel: 7000,
      accommodation: 4000,
      misc: 1000,
    },
    itinerary: [
      { day: "Day 1", time: "10:00 AM", activity: "Arrival & Mall Road exploration" },
      { day: "Day 2", time: "9:00 AM", activity: "Solang Valley snow activities" },
      { day: "Day 3", time: "11:00 AM", activity: "Manu Temple visit & departure" }
    ]
  },
  {
    id: 2,
    name: "Goa",
    category: "Beach",
    cost: 12000,
    description: "Popular beach destination with nightlife.",
    image: goa,
    expenseBreakdown: {
      food: 2500,
      travel: 5000,
      accommodation: 3500,
      misc: 1000,
    },
    itinerary: [
      { day: "Day 1", time: "12:00 PM", activity: "Check-in & Beach visit" },
      { day: "Day 2", time: "10:00 AM", activity: "Water sports & Fort Aguada" },
      { day: "Day 3", time: "8:00 AM", activity: "Local shopping & departure" }
    ]
  },
  {
    id: 3,
    name: "Delhi",
    category: "City",
    cost: 8000,
    description: "Capital city with historical monuments.",
    image: delhi,
    expenseBreakdown: {
      food: 2000,
      travel: 2500,
      accommodation: 2500,
      misc: 1000,
    },
    itinerary: [
      { day: "Day 1", time: "10:00 AM", activity: "Red Fort & Jama Masjid visit" },
      { day: "Day 2", time: "11:00 AM", activity: "India Gate & Museums" },
      { day: "Day 3", time: "9:00 AM", activity: "Chandni Chowk & shopping" }
    ]
  },
  {
    id: 4,
    name: "Jaipur",
    category: "City",
    cost: 10000,
    description: "The Pink City with rich cultural heritage.",
    image: jaipur,
    expenseBreakdown: {
      food: 2500,
      travel: 3000,
      accommodation: 3000,
      misc: 1500,
    },
    itinerary: [
      { day: "Day 1", time: "1:00 PM", activity: "City Palace & Hawa Mahal" },
      { day: "Day 2", time: "10:00 AM", activity: "Amber Fort & Jal Mahal" },
      { day: "Day 3", time: "8:30 AM", activity: "Local markets & crafts" }
    ]
  },
  {
    id: 5,
    name: "Ladakh",
    category: "Mountain",
    cost: 20000,
    description: "High-altitude desert with breathtaking views.",
    image: ladakh,
    expenseBreakdown: {
      food: 3500,
      travel: 9000,
      accommodation: 6000,
      misc: 1500,
    },
    itinerary: [
      { day: "Day 1", time: "9:00 AM", activity: "Arrival & Leh Market" },
      { day: "Day 2", time: "8:00 AM", activity: "Pangong Lake day trip" },
      { day: "Day 3", time: "10:00 AM", activity: "Monasteries & return" }
    ]
  },
  {
    id: 6,
    name: "Mumbai",
    category: "City",
    cost: 11000,
    description: "The city of dreams, buzzing with energy and sea views.",
    image: mumbai,
    expenseBreakdown: {
      food: 3000,
      travel: 3500,
      accommodation: 3000,
      misc: 1500,
    },
    itinerary: [
      { day: "Day 1", time: "11:00 AM", activity: "Gateway of India & Marine Drive" },
      { day: "Day 2", time: "10:00 AM", activity: "Elephanta Caves & Juhu Beach" },
      { day: "Day 3", time: "9:00 AM", activity: "Shopping & Bollywood tour" }
    ]
  }
];

export default destinationsData;
