import { Transaction } from "./transaction.model.js";

export const createTransaction = async (data) => {
  return await Transaction.create(data);
};

export const findTransactions = async (filter, options) => {
  const { page, limit } = options;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Transaction.find(filter)
      .sort({ transactionDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Transaction.countDocuments(filter),
  ]);

  return { data, total, page, limit };
};

export const findTransactionById = async (id, userId) => {
  return await Transaction.findOne({ _id: id, userId });
};

export const updateTransaction = async (id, userId, updateData) => {
  return await Transaction.findOneAndUpdate({ _id: id, userId }, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteTransaction = async (id, userId) => {
  return await Transaction.findOneAndDelete({ _id: id, userId });
};
