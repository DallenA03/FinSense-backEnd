import { User } from "./auth.model.js";
import { generateToken } from "../../common/utils/token.js";
import { verifyFirebaseToken } from "../../common/utils/firebaseAuth.js";
import { saveEmailOAuth } from "../email/email.service.js";

/**
 * Handles Firebase Login (via Google or Email) from Mobile/Flutter
 * Verifies idToken and creates/updates user and email connection
 */
export const firebaseLoginService = async ({ idToken, accessToken, refreshToken, expiryDate }) => {
  const firebaseUser = await verifyFirebaseToken(idToken);

  let user = await User.findOne({ firebaseUid: firebaseUser.uid });

  if (!user) {
    user = await User.create({
      name: firebaseUser.name,
      email: firebaseUser.email,
      firebaseUid: firebaseUser.uid,
      emailVerified: firebaseUser.emailVerified,
      provider: "google", // or determine from firebaseUser
    });
  } else {
    // Update user info
    user.name = firebaseUser.name;
    user.emailVerified = firebaseUser.emailVerified;
    await user.save();
  }

  // If mobile also provided access/refresh tokens for Gmail/Outlook access
  if (accessToken) {
    await saveEmailOAuth({
      userId: user._id,
      email: user.email,
      accessToken,
      refreshToken,
      expiryDate
    });
  }

  const token = generateToken({ id: user._id });

  return {
    user,
    token,
  };
};

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};