import express from "express";
import { register, login, getMe } from "./auth.controller.js";
import { validate } from "../../common/middlewares/validate.middleware.js";
import { registerSchema, loginSchema, resetPasswordSchema } from "./auth.validator.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";

const router = express.Router();

router.post("/reset-password", validate(resetPasswordSchema), resetPassword);
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", authMiddleware, getMe);

export default router;
