import { catchAsync } from "../../common/utils/catchAsync.js";
import { successResponse, errorResponse } from "../../common/utils/response.js";
import * as uploadService from "./upload.service.js";

// @desc    Upload a file and get a preview of transactions
// @route   POST /api/v1/upload/preview
// @access  Private
export const previewUpload = catchAsync(async (req, res) => {
  if (!req.file) {
    return errorResponse(res, 400, "Please upload a file");
  }

  const transactions = await uploadService.getFilePreview(req.file);

  return successResponse(res, 200, "File parsed successfully", { 
    filename: req.file.originalname,
    count: transactions.length,
    transactions 
  });
});

// @desc    Confirm and save transactions from preview
// @route   POST /api/v1/upload/confirm
// @access  Private
export const confirmUpload = catchAsync(async (req, res) => {
  const { transactions } = req.body;

  if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
    return errorResponse(res, 400, "No transactions to confirm");
  }

  const result = await uploadService.saveConfirmedTransactions(req.user.id, transactions);

  return successResponse(res, 201, "Transactions processed", result);
});
