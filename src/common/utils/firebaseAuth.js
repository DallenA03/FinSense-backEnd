import admin from "../../config/firebase.js";

/**
 * Verifies Firebase ID Token and returns user payload
 * @param {string} idToken 
 */
export const verifyFirebaseToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email.split('@')[0],
      picture: decodedToken.picture,
      emailVerified: decodedToken.email_verified,
    };
  } catch (error) {
    console.error("Firebase Verify Error:", error.message);
    throw new Error("Invalid or expired Firebase ID Token");
  }
};
