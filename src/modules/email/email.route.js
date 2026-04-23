import express from "express";
import { getGoogleAuthUrl, googleCallback, getConfigs, syncEmails } from "./email.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";

const router = express.Router();

// Public callback (Google will call this)
router.get("/auth/google/callback", googleCallback);

// Private routes
router.use(authMiddleware);
router.get("/auth/google", getGoogleAuthUrl);
router.get("/config", getConfigs);
router.post("/sync/:configId", syncEmails);

export default router;
