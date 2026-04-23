import { verifyToken } from "../utils/token.js";
import { errorResponse } from "../utils/response.js";

export const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  if (!token) return errorResponse(res, 401, "Unauthorized! No Token Provided");

  const decoded = verifyToken(token);
  
  if (!decoded) return errorResponse(res, 401, "Unauthorized! Token is invalid or expired");

  req.user = decoded;
  next();
};