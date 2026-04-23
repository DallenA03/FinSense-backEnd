import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountId: {
      type: String, // Keeping as String for now, can be changed to ObjectId if Account model is created later
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    transactionDate: {
      type: Date,
      required: true,
    },
    source: {
      type: String,
      enum: ["manual", "email", "csv", "pdf"],
      default: "manual",
    },
    referenceId: {
      type: String, // Used for deduplicating email/file imports
      unique: true,
      sparse: true, // Only index if it exists
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster filtering and pagination
transactionSchema.index({ userId: 1, transactionDate: -1 });
transactionSchema.index({ userId: 1, type: 1 });
transactionSchema.index({ userId: 1, category: 1 });

export const Transaction = mongoose.model("Transaction", transactionSchema);
