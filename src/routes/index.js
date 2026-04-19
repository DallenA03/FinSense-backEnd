import express from "express";
import authRoutes from "../modules/auth/auth.route.js";
import transactionRoutes from "../modules/transaction/transaction.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/transactions", transactionRoutes);

export default router;