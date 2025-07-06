import manali from "../assets/manali.jpeg";
import goa from "../assets/goa.jpeg";
import delhi from "../assets/delhi.jpeg";
import jaipur from "../assets/jaipur.jpeg";
import ladakh from "../assets/ladakh.jpeg";
import mumbai from "../assets/mumbai.jpeg";
import kerala from "../assets/kerala.jpeg";
import agra from "../assets/agra.jpeg";
import rishikesh from "../assets/rishikesh.jpeg";
import shimla from "../assets/shimla.jpeg";
import ooty from "../assets/ooty.jpeg";
import varanasi from "../assets/varanasi.jpeg";
import pondicherry from "../assets/pondicherry.jpeg";
import darjeeling from "../assets/darjeeling.jpeg";
import andaman from "../assets/andaman.jpeg";

const destinationsData = [
  {
    id: 1,
    name: "Manali",
    category: "Mountain",
    cost: 15000,
    description: "Scenic hill station in Himachal Pradesh.",
    image: manali,
    itinerary: [
      {
        day: "Day 1",
        time: "10:00 AM",
        activity: "Arrival & Mall Road exploration",
      },
      {
        day: "Day 2",
        time: "9:00 AM",
        activity: "Solang Valley snow activities",
      },
      {
        day: "Day 3",
        time: "11:00 AM",
        activity: "Manu Temple visit & departure",
      },
    ],
  },
  {
    id: 2,
    name: "Goa",
    category: "Beach",
    cost: 12000,
    description: "Popular beach destination with nightlife.",
    image: goa,
    itinerary: [
      { day: "Day 1", time: "12:00 PM", activity: "Check-in & Beach visit" },
      {
        day: "Day 2",
        time: "10:00 AM",
        activity: "Water sports & Fort Aguada",
      },
      { day: "Day 3", time: "8:00 AM", activity: "Local shopping & departure" },
    ],
  },
  {
    id: 3,
    name: "Delhi",
    category: "City",
    cost: 8000,
    description: "Capital city with historical monuments.",
    image: delhi,
    itinerary: [
      {
        day: "Day 1",
        time: "10:00 AM",
        activity: "Red Fort & Jama Masjid visit",
      },
      { day: "Day 2", time: "11:00 AM", activity: "India Gate & Museums" },
      { day: "Day 3", time: "9:00 AM", activity: "Chandni Chowk & shopping" },
    ],
  },
  {
    id: 4,
    name: "Jaipur",
    category: "City",
    cost: 10000,
    description: "The Pink City with rich cultural heritage.",
    image: jaipur,
    itinerary: [
      { day: "Day 1", time: "1:00 PM", activity: "City Palace & Hawa Mahal" },
      { day: "Day 2", time: "10:00 AM", activity: "Amber Fort & Jal Mahal" },
      { day: "Day 3", time: "8:30 AM", activity: "Local markets & crafts" },
    ],
  },
  {
    id: 5,
    name: "Ladakh",
    category: "Mountain",
    cost: 20000,
    description: "High-altitude desert with breathtaking views.",
    image: ladakh,
    itinerary: [
      { day: "Day 1", time: "9:00 AM", activity: "Arrival & Leh Market" },
      { day: "Day 2", time: "8:00 AM", activity: "Pangong Lake day trip" },
      { day: "Day 3", time: "10:00 AM", activity: "Monasteries & return" },
    ],
  },
  {
    id: 6,
    name: "Mumbai",
    category: "City",
    cost: 11000,
    description: "The city of dreams, buzzing with energy and sea views.",
    image: mumbai,
    itinerary: [
      {
        day: "Day 1",
        time: "11:00 AM",
        activity: "Gateway of India & Marine Drive",
      },
      {
        day: "Day 2",
        time: "10:00 AM",
        activity: "Elephanta Caves & Juhu Beach",
      },
      { day: "Day 3", time: "9:00 AM", activity: "Shopping & Bollywood tour" },
    ],
  },
  {
    id: 7,
    name: "Kerala",
    category: "Backwaters",
    cost: 14000,
    description: "God's own country with serene houseboats.",
    image: kerala,
    itinerary: [
      {
        day: "Day 1",
        time: "10:00 AM",
        activity: "Arrival & backwater cruise",
      },
      {
        day: "Day 2",
        time: "9:00 AM",
        activity: "Ayurvedic spa & village tour",
      },
      { day: "Day 3", time: "8:00 AM", activity: "Local cuisine & departure" },
    ],
  },
  {
    id: 8,
    name: "Agra",
    category: "Historical",
    cost: 7000,
    description: "Home to the majestic Taj Mahal.",
    image: agra,
    itinerary: [
      {
        day: "Day 1",
        time: "9:00 AM",
        activity: "Taj Mahal & Agra Fort visit",
      },
      {
        day: "Day 2",
        time: "10:00 AM",
        activity: "Mehtab Bagh & local market",
      },
      {
        day: "Day 3",
        time: "11:00 AM",
        activity: "Fatehpur Sikri & departure",
      },
    ],
  },
  {
    id: 9,
    name: "Rishikesh",
    category: "Adventure",
    cost: 9000,
    description: "Yoga capital & river rafting hub.",
    image: rishikesh,
    itinerary: [
      {
        day: "Day 1",
        time: "10:00 AM",
        activity: "Triveni Ghat & Ganga Aarti",
      },
      { day: "Day 2", time: "8:00 AM", activity: "River rafting & camping" },
      { day: "Day 3", time: "9:00 AM", activity: "Local cafes & departure" },
    ],
  },
  {
    id: 10,
    name: "Shimla",
    category: "Mountain",
    cost: 13000,
    description: "Charming hill station with colonial charm.",
    image: shimla,
    itinerary: [
      { day: "Day 1", time: "11:00 AM", activity: "Mall Road & Ridge walk" },
      { day: "Day 2", time: "9:00 AM", activity: "Jakhoo Temple & Kufri" },
      { day: "Day 3", time: "10:00 AM", activity: "Shopping & departure" },
    ],
  },
  {
    id: 11,
    name: "Ooty",
    category: "Hill Station",
    cost: 12000,
    description: "Queen of the Nilgiris with botanical beauty.",
    image: ooty,
    itinerary: [
      { day: "Day 1", time: "10:00 AM", activity: "Botanical Garden & Lake" },
      {
        day: "Day 2",
        time: "9:00 AM",
        activity: "Tea factory & Doddabetta Peak",
      },
      { day: "Day 3", time: "8:00 AM", activity: "Toy train & shopping" },
    ],
  },
  {
    id: 12,
    name: "Varanasi",
    category: "Spiritual",
    cost: 8500,
    description: "Ancient city on the banks of the Ganges.",
    image: varanasi,
    itinerary: [
      {
        day: "Day 1",
        time: "9:00 AM",
        activity: "Kashi Vishwanath Temple & ghats",
      },
      {
        day: "Day 2",
        time: "7:00 AM",
        activity: "Sunrise boat ride & Sarnath",
      },
      { day: "Day 3", time: "10:00 AM", activity: "Silk market & departure" },
    ],
  },
  {
    id: 13,
    name: "Pondicherry",
    category: "Beach",
    cost: 11000,
    description: "French colonial town with calm beaches.",
    image: pondicherry,
    itinerary: [
      { day: "Day 1", time: "10:00 AM", activity: "Promenade & White Town" },
      { day: "Day 2", time: "9:00 AM", activity: "Auroville & beaches" },
      { day: "Day 3", time: "8:00 AM", activity: "Shopping & cafes" },
    ],
  },
  {
    id: 14,
    name: "Darjeeling",
    category: "Hill Station",
    cost: 12500,
    description: "Tea gardens & toy train ride in the Himalayas.",
    image: darjeeling,
    itinerary: [
      {
        day: "Day 1",
        time: "11:00 AM",
        activity: "Tea estate visit & mall road",
      },
      {
        day: "Day 2",
        time: "4:00 AM",
        activity: "Tiger Hill sunrise & toy train",
      },
      { day: "Day 3", time: "9:00 AM", activity: "Monasteries & shopping" },
    ],
  },
  {
    id: 15,
    name: "Andaman",
    category: "Island",
    cost: 22000,
    description: "Tropical paradise with coral beaches.",
    image: andaman,
    itinerary: [
      { day: "Day 1", time: "12:00 PM", activity: "Arrival & Cellular Jail" },
      {
        day: "Day 2",
        time: "9:00 AM",
        activity: "Havelock Island & snorkeling",
      },
      {
        day: "Day 3",
        time: "10:00 AM",
        activity: "Radhanagar Beach & departure",
      },
    ],
  },
];

export default destinationsData;
