import * as transactionRepo from "./transaction.repository.js";

export const createTransaction = async (userId, data) => {
  // Check for deduplication if source is email/csv/pdf and has referenceId
  if (data.referenceId) {
    const existing = await transactionRepo.findTransactions(
      { referenceId: data.referenceId, userId },
      { page: 1, limit: 1 }
    );
    if (existing.total > 0) {
      const error = new Error("Transaction already exists (duplicate reference)");
      error.statusCode = 409;
      throw error;
    }
  }

  const transactionData = {
    ...data,
    userId,
  };

  return await transactionRepo.createTransaction(transactionData);
};

export const getTransactions = async (userId, query) => {
  const { page = 1, limit = 10, type, category, startDate, endDate } = query;

  const filter = { userId };
  
  if (type) filter.type = type;
  if (category) filter.category = category;
  
  if (startDate || endDate) {
    filter.transactionDate = {};
    if (startDate) filter.transactionDate.$gte = new Date(startDate);
    if (endDate) filter.transactionDate.$lte = new Date(endDate);
  }

  const result = await transactionRepo.findTransactions(filter, { page, limit });

  return {
    transactions: result.data,
    pagination: {
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    },
  };
};

export const updateTransaction = async (id, userId, data) => {
  const transaction = await transactionRepo.updateTransaction(id, userId, data);
  
  if (!transaction) {
    const error = new Error("Transaction not found or not authorized");
    error.statusCode = 404;
    throw error;
  }

  return transaction;
};

export const deleteTransaction = async (id, userId) => {
  const transaction = await transactionRepo.deleteTransaction(id, userId);
  
  if (!transaction) {
    const error = new Error("Transaction not found or not authorized");
    error.statusCode = 404;
    throw error;
  }

  return { id };
};
