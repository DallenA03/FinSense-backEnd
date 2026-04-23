import multer from "multer";
import path from "path";
import { errorResponse } from "../utils/response.js";

// Store files in memory to parse them immediately without saving to disk
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".csv", ".pdf"];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV and PDF files are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return errorResponse(res, 400, `Upload error: ${err.message}`);
  } else if (err) {
    return errorResponse(res, 400, err.message);
  }
  next();
};
