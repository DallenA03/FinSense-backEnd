import Joi from "joi";

export const createTransactionSchema = Joi.object({
  accountId: Joi.string().optional(),
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  transactionDate: Joi.date().iso().required(),
  source: Joi.string().valid("manual", "email", "csv", "pdf").optional(),
  referenceId: Joi.string().optional(),
});

export const updateTransactionSchema = Joi.object({
  accountId: Joi.string().optional(),
  amount: Joi.number().positive().optional(),
  type: Joi.string().valid("income", "expense").optional(),
  category: Joi.string().optional(),
  description: Joi.string().optional(),
  transactionDate: Joi.date().iso().optional(),
}).min(1);

export const getTransactionsQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  type: Joi.string().valid("income", "expense").optional(),
  category: Joi.string().optional(),
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().optional(),
});