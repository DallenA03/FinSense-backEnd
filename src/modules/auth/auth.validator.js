import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email",
    "string.empty": "Email is required",
    "string.pattern.base": "Please provide a valid email",

  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.empty": "Password is required",
    "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, special character and one number",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email",
    "string.empty": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.empty": "Password is required",
    "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, special character and one number",
  }),
  newPassword: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.empty": "Password is required",
    "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, special character and one number",
  }),
});
