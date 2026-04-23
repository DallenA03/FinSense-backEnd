import { errorResponse } from "../utils/response.js";

export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message).join(", ");
    return errorResponse(res, 400, errorMessages);
  }

  // Override req.body with sanitized and validated data
  req.body = value;
  next();
};
