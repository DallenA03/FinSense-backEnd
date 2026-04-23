import { catchAsync } from "../../common/utils/catchAsync.js";
import * as transactionService from "./transaction.service.js";

// @desc    Create a new transaction
// @route   POST /api/v1/transactions
// @access  Private
export const createTx = catchAsync(async (req, res) => {
  const result = await transactionService.createTransaction(req.user.id, req.body);

  res.status(201).json({
    success: true,
    message: "Transaction created successfully",
    data: result,
  });
});

// @desc    Get all transactions with pagination and filters
// @route   GET /api/v1/transactions
// @access  Private
export const getTx = catchAsync(async (req, res) => {
  const result = await transactionService.getTransactions(req.user.id, req.query);

  res.status(200).json({
    success: true,
    message: "Transactions fetched successfully",
    data: result,
  });
});

// @desc    Update a transaction
// @route   PUT /api/v1/transactions/:id
// @access  Private
export const updateTx = catchAsync(async (req, res) => {
  const result = await transactionService.updateTransaction(req.params.id, req.user.id, req.body);

  res.status(200).json({
    success: true,
    message: "Transaction updated successfully",
    data: result,
  });
});

// @desc    Delete a transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Private
export const deleteTx = catchAsync(async (req, res) => {
  const result = await transactionService.deleteTransaction(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    message: "Transaction deleted successfully",
    data: result,
  });
});
