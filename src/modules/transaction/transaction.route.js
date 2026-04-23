import express from "express";
import { createTx, getTx, updateTx, deleteTx } from "./transaction.controller.js";
import { validate } from "../../common/middlewares/validate.middleware.js";
import { createTransactionSchema, updateTransactionSchema, getTransactionsQuerySchema } from "./transaction.validator.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";

const router = express.Router();

// Apply auth middleware to all routes in this module
router.use(authMiddleware);

router
  .route("/")
  .post(validate(createTransactionSchema), createTx)
  .get(validate(getTransactionsQuerySchema), getTx);

router
  .route("/:id")
  .put(validate(updateTransactionSchema), updateTx)
  .delete(deleteTx);

export default router;
