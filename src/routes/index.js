import express from "express";
import authRoutes from "../modules/auth/auth.route.js";
import transactionRoutes from "../modules/transaction/transaction.route.js";
import aiRoutes from "../modules/ai/ai.route.js";
import analyticsRoutes from "../modules/analytics/analytics.route.js";
import uploadRoutes from "../modules/upload/upload.route.js";
import emailRoutes from "../modules/email/email.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/transactions", transactionRoutes);
router.use("/ai", aiRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/upload", uploadRoutes);
router.use("/email", emailRoutes);

export default router;