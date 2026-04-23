import { catchAsync } from "../../common/utils/catchAsync.js";
import { successResponse } from "../../common/utils/response.js";
import * as transactionService from "./transaction.service.js";

// @desc    Create a new transaction
// @route   POST /api/v1/transactions
// @access  Private
export const createTx = catchAsync(async (req, res) => {
  const result = await transactionService.createTransaction(req.user.id, req.body);
  return successResponse(res, 201, "Transaction created successfully", result);
});

// @desc    Get all transactions with pagination and filters
// @route   GET /api/v1/transactions
// @access  Private
export const getTx = catchAsync(async (req, res) => {
  const result = await transactionService.getTransactions(req.user.id, req.query);
  return successResponse(res, 200, "Transactions fetched successfully", result);
});

// @desc    Update a transaction
// @route   PUT /api/v1/transactions/:id
// @access  Private
export const updateTx = catchAsync(async (req, res) => {
  const result = await transactionService.updateTransaction(req.params.id, req.user.id, req.body);
  return successResponse(res, 200, "Transaction updated successfully", result);
});

// @desc    Delete a transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Private
export const deleteTx = catchAsync(async (req, res) => {
  const result = await transactionService.deleteTransaction(req.params.id, req.user.id);
  return successResponse(res, 200, "Transaction deleted successfully", result);
});
