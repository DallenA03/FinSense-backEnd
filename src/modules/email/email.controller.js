import { catchAsync } from "../../common/utils/catchAsync.js";
import { successResponse, errorResponse } from "../../common/utils/response.js";
import * as emailService from "./email.service.js";

// @desc    Get Google OAuth2 URL
// @route   GET /api/v1/email/auth/google
// @access  Private
export const getGoogleAuthUrl = catchAsync(async (req, res) => {
  const url = emailService.getGmailAuthUrl(req.user.id);
  return successResponse(res, 200, "Auth URL generated", { url });
});

// @desc    Handle Google OAuth2 Callback
// @route   GET /api/v1/email/auth/google/callback
// @access  Public (Called by Google)
export const googleCallback = catchAsync(async (req, res) => {
  const { code, state: userId } = req.query;
  
  if (!code) return errorResponse(res, 400, "Auth code missing");

  await emailService.handleGmailCallback(code, userId);

  // Redirect to frontend (adjust as needed)
  return res.redirect(`${process.env.FRONTEND_URL}/settings/email?status=success`);
});

// @desc    Get all email configurations
// @route   GET /api/v1/email/config
// @access  Private
export const getConfigs = catchAsync(async (req, res) => {
  const result = await emailService.getConfigs(req.user.id);
  return successResponse(res, 200, "Email configurations fetched", result);
});

// @desc    Manual trigger to fetch and sync emails
// @route   POST /api/v1/email/sync/:configId
// @access  Private
export const syncEmails = catchAsync(async (req, res) => {
  const result = await emailService.connectAndFetchEmails(req.params.configId, req.user.id);
  return successResponse(res, 200, `Sync complete. ${result.length} transactions found.`, result);
});
