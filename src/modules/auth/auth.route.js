import express from "express";
import { getMe, firebaseLogin } from "./auth.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";

const router = express.Router();

router.post("/firebase-login", firebaseLogin);
router.get("/me", authMiddleware, getMe);

export default router;
