import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  day: String,
  location: String,
  description: String,
});

const expenseBreakdownSchema = new mongoose.Schema({
  food: Number,
  travel: Number,
  accommodation: Number,
  misc: Number,
});

const tripSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: String,
    category: String,
    cost: Number,
    image: String,
    completed: { type: Boolean, default: false },
    expenseBreakdown: expenseBreakdownSchema,
    itinerary: [itinerarySchema],
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
