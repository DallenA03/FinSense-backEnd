import { catchAsync } from "../../common/utils/catchAsync.js";
import * as aiService from "./ai.service.js";

// @desc    Categorize a transaction using AI
// @route   POST /api/v1/ai/categorize
// @access  Private
export const categorizeTx = catchAsync(async (req, res) => {
  const { description } = req.body;
  
  if (!description) {
    return res.status(400).json({ success: false, message: "Description is required" });
  }

  const category = await aiService.categorizeTransaction(description);

  res.status(200).json({
    success: true,
    message: "Categorization successful",
    data: { category },
  });
});

// @desc    Generate personalized financial insights
// @route   GET /api/v1/ai/insights
// @access  Private
export const getInsights = catchAsync(async (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  const month = req.query.month || new Date().getMonth() + 1;

  const insights = await aiService.generateInsights(req.user.id, year, month);

  res.status(200).json({
    success: true,
    message: "Insights generated successfully",
    data: { insights },
  });
});

// @desc    Check if expenses cross monthly budget and generate notifications
// @route   POST /api/v1/ai/check-budget
// @access  Private
export const checkBudgets = catchAsync(async (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  const month = req.query.month || new Date().getMonth() + 1;
  const { budgets } = req.body; // Expects an object mapping category to budget limit
  
  if (!budgets) {
    return res.status(400).json({ success: false, message: "Budgets object is required" });
  }

  const notifications = await aiService.checkBudgetCrossing(req.user.id, year, month, budgets);

  res.status(200).json({
    success: true,
    message: "Budget evaluation complete",
    data: { notifications },
  });
});
