import { catchAsync } from "../../common/utils/catchAsync.js";
import { successResponse } from "../../common/utils/response.js";
import { registerUser, loginUser, getUserProfile, resetPassword } from "./auth.service.js";

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = catchAsync(async (req, res) => {
  const result = await registerUser(req.body);
  return successResponse(res, 201, "User registered successfully", result);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = catchAsync(async (req, res) => {
  const result = await loginUser(req.body);
  return successResponse(res, 200, "Login successful", result);
});

// @desc    Get current user profile
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = catchAsync(async (req, res) => {
  const user = await getUserProfile(req.user.id);
  return successResponse(res, 200, "User profile fetched successfully", { user });
});

// @desc    Reset Password
// @route   POST /api/v1/auth/reset-password
// @access  Public
export const resetPassword = catchAsync(async (req, res) => {
  const result = await resetPassword(req.body);
  return successResponse(res, 200, "Password reset successfully", result);
});