import express from "express";
import {
  createTrip,
  getUserTrips,
  getTrip,
  updateTrip,
  deleteTrip,
} from "../controllers/tripController.js";

const router = express.Router();

router.post("/", createTrip);
router.get("/", getUserTrips);
router.get("/:id", getTrip);
router.patch("/:id/complete", updateTrip);
router.delete("/:id", deleteTrip); // ✅ added DELETE route

export default router;
