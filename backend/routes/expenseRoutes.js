import express from "express";
import { getUserExpenses } from "../controllers/expenseController.js";

const router = express.Router();

router.get("/", getUserExpenses);

export default router;
