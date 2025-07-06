import Trip from "../models/Trip.js";

// Create a new trip
export const createTrip = async (req, res) => {
  try {
    const tripData = { ...req.body, userId: req.auth.userId };
    const trip = await Trip.create(tripData);
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all trips for current user
export const getUserTrips = async (req, res) => {
  const trips = await Trip.find({ userId: req.auth.userId });
  res.json(trips);
};

// Get a specific trip
export const getTrip = async (req, res) => {
  const trip = await Trip.findOne({
    _id: req.params.id,
    userId: req.auth.userId,
  });
  if (!trip) return res.status(404).json({ error: "Trip not found" });
  res.json(trip);
};

// Update trip completion status
export const updateTrip = async (req, res) => {
  const trip = await Trip.findOneAndUpdate(
    { _id: req.params.id, userId: req.auth.userId },
    { completed: req.body.completed },
    { new: true }
  );
  if (!trip)
    return res.status(404).json({ error: "Trip not found or unauthorized" });
  res.json(trip);
};

// ✅ Delete a trip
export const deleteTrip = async (req, res) => {
  const trip = await Trip.findOneAndDelete({
    _id: req.params.id,
    userId: req.auth.userId,
  });

  if (!trip)
    return res.status(404).json({ error: "Trip not found or unauthorized" });

  res.json({ message: "Trip deleted successfully" });
};
