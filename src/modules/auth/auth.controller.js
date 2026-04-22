import { catchAsync } from "../../common/utils/catchAsync.js";
import { registerUser, loginUser, getUserProfile, resetPassword } from "./auth.service.js";

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = catchAsync(async (req, res) => {
  const result = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = catchAsync(async (req, res) => {
  const result = await loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

// @desc    Get current user profile
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = catchAsync(async (req, res) => {
  // req.user logic is populated by authMiddleware
  const user = await getUserProfile(req.user.id);

  res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    data: { user },
  });
});

// @desc    Reset Password
// @route   POST /api/v1/auth/reset-password
// @access  Public
export const resetPassword = catchAsync(async (req, res) => {
  const result = await resetPassword(req.body);

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
    data: result,
  });
});