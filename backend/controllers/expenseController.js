import Trip from "../models/Trip.js";

export const getUserExpenses = async (req, res) => {
  const trips = await Trip.find({
    userId: req.auth.userId,
    completed: true,
  });

  const summary = trips.reduce(
    (acc, t) => {
      acc.food += t.expenseBreakdown.food || 0;
      acc.stay += t.expenseBreakdown.accommodation || 0;
      acc.places +=
        (t.expenseBreakdown.misc || 0) + (t.expenseBreakdown.travel || 0);
      return acc;
    },
    { food: 0, stay: 0, places: 0 }
  );

  summary.total = summary.food + summary.stay + summary.places;
  res.json(summary);
};
