import express from "express";
import { getMonthlySummary, getCategoryBreakdown } from "./analytics.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";

const router = express.Router();

// Apply auth middleware to all routes in this module
router.use(authMiddleware);

router.get("/monthly-summary", getMonthlySummary);
router.get("/category-breakdown", getCategoryBreakdown);

export default router;
