import { catchAsync } from "../../common/utils/catchAsync.js";
import { successResponse, errorResponse } from "../../common/utils/response.js";
import { getUserProfile, firebaseLoginService } from "./auth.service.js";

/**
 * @desc    Firebase Login (Google/Email Flow)
 * @route   POST /api/v1/auth/firebase-login
 * @body    { idToken, accessToken, refreshToken, expiryDate }
 */
export const firebaseLogin = catchAsync(async (req, res) => {
  const { idToken, accessToken, refreshToken, expiryDate } = req.body;
  
  if (!idToken) return errorResponse(res, 400, "Firebase ID Token is required");

  const result = await firebaseLoginService({ idToken, accessToken, refreshToken, expiryDate });
  
  return successResponse(res, 200, "Login successful", result);
});

// @desc    Get current user profile
// @route   GET /api/v1/auth/me
export const getMe = catchAsync(async (req, res) => {
  const user = await getUserProfile(req.user.id);
  return successResponse(res, 200, "User profile fetched successfully", { user });
});














// @desc    Reset Password
// @route   POST /api/v1/auth/reset-password
// @access  Public
// export const resetPassword = catchAsync(async (req, res) => {
//   const result = await resetPassword(req.body);
//   return successResponse(res, 200, "Password reset successfully", result);
// });