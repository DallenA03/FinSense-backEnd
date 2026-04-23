import express from "express";
import { categorizeTx, getInsights, checkBudgets } from "./ai.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

router.post("/categorize", categorizeTx);
router.get("/insights", getInsights);
router.post("/check-budget", checkBudgets);

export default router;
