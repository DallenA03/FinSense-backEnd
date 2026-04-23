import express from "express";
import authRoutes from "../modules/auth/auth.route.js";
import transactionRoutes from "../modules/transaction/transaction.route.js";
import aiRoutes from "../modules/ai/ai.route.js";
import analyticsRoutes from "../modules/analytics/analytics.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/transactions", transactionRoutes);
router.use("/ai", aiRoutes);
router.use("/analytics", analyticsRoutes);

export default router;