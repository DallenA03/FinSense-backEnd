import mongoose from "mongoose";
import { Transaction } from "../transaction/transaction.model.js";

// Helper to get start and end dates of a month
const getMonthDateRange = (year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);
  return { startDate, endDate };
};

export const getMonthlySummary = async (userId, year, month) => {
  const { startDate, endDate } = getMonthDateRange(year, month);

  const summary = await Transaction.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        transactionDate: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: "$type",
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);

  let income = 0;
  let expense = 0;

  summary.forEach((item) => {
    if (item._id === "income") income = item.totalAmount;
    if (item._id === "expense") expense = item.totalAmount;
  });

  return {
    year: parseInt(year),
    month: parseInt(month),
    income,
    expense,
    balance: income - expense,
  };
};

export const getCategoryBreakdown = async (userId, year, month, type = "expense") => {
  const { startDate, endDate } = getMonthDateRange(year, month);

  const breakdown = await Transaction.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        type: type, // "income" or "expense"
        transactionDate: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { totalAmount: -1 }, // Sort from largest to smallest amount
    },
  ]);

  return breakdown.map((item) => ({
    category: item._id,
    totalAmount: item.totalAmount,
    count: item.count,
  }));
};
