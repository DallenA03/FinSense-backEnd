import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env.js";

export const generateToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null; // Return null if invalid or expired
  }
};
