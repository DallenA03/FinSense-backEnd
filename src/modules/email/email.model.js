import mongoose from "mongoose";

const emailConfigSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    provider: {
      type: String,
      enum: ["gmail", "outlook"],
      required: true,
    },

    // OAuth ONLY (recommended)
    accessToken: {
      type: String, // 🔒 encrypted
      select: false,
    },

    refreshToken: {
      type: String, // 🔒 encrypted
      select: false,
    },

    tokenExpiry: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastFetchedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate email per user
emailConfigSchema.index({ userId: 1, email: 1 }, { unique: true });

export const EmailConfig = mongoose.model("EmailConfig", emailConfigSchema);
