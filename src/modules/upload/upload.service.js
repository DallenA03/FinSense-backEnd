import * as parser from "./upload.parser.js";
import * as transactionService from "../transaction/transaction.service.js";

export const getFilePreview = async (file) => {
  const extension = file.originalname.split(".").pop().toLowerCase();
  let transactions = [];

  if (extension === "csv") {
    transactions = parser.parseCSV(file.buffer);
  } else if (extension === "pdf") {
    transactions = await parser.parsePDF(file.buffer);
  } else {
    throw new Error("Unsupported file format");
  }

  return transactions.map(tx => ({
    ...tx,
    source: extension
  }));
};

export const saveConfirmedTransactions = async (userId, transactions) => {
  const saved = [];
  const errors = [];

  for (const txData of transactions) {
    try {
      const result = await transactionService.createTransaction(userId, txData);
      saved.push(result);
    } catch (error) {
      errors.push({
        description: txData.description,
        error: error.message
      });
    }
  }

  return {
    totalSaved: saved.length,
    totalFailed: errors.length,
    saved,
    errors
  };
};
