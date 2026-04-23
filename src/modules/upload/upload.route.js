import express from "express";
import { previewUpload, confirmUpload } from "./upload.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { upload, handleUploadError } from "../../common/middlewares/upload.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/preview", upload.single("file"), handleUploadError, previewUpload);
router.post("/confirm", confirmUpload);

export default router;
