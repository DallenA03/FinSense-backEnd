import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env.js";
import { createUser, findUserByEmail, findUserById } from "./auth.repository.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (data) => {
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    const error = new Error("User already exists with this email");
    error.statusCode = 400; // Will be caught by error middleware
    throw error;
  }

  const user = await createUser(data);

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

export const loginUser = async (data) => {
  const user = await findUserByEmail(data.email);
  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordMatch = await user.comparePassword(data.password);
  if (!isPasswordMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

export const getUserProfile = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

export const resetPassword = async (data) => {
  const user = await findUserByEmail(data.email);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isPasswordMatch = await user.comparePassword(data.password);
  if (!isPasswordMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  user.password = data.newPassword;
  await user.save();

  return {
    message: "Password reset successfully",
  };
};