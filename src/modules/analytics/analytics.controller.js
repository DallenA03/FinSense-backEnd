import { catchAsync } from "../../common/utils/catchAsync.js";
import * as analyticsService from "./analytics.service.js";

// @desc    Get monthly summary (income vs expense vs balance)
// @route   GET /api/v1/analytics/monthly-summary
// @access  Private
export const getMonthlySummary = catchAsync(async (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  const month = req.query.month || new Date().getMonth() + 1; // 1 to 12

  const result = await analyticsService.getMonthlySummary(req.user.id, year, month);

  res.status(200).json({
    success: true,
    message: "Monthly summary fetched successfully",
    data: result,
  });
});

// @desc    Get category breakdown
// @route   GET /api/v1/analytics/category-breakdown
// @access  Private
export const getCategoryBreakdown = catchAsync(async (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  const month = req.query.month || new Date().getMonth() + 1;
  const type = req.query.type || "expense"; // default to analyzing expenses

  const result = await analyticsService.getCategoryBreakdown(req.user.id, year, month, type);

  res.status(200).json({
    success: true,
    message: "Category breakdown fetched successfully",
    data: result,
  });
});
