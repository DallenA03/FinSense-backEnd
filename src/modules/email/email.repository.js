import { EmailConfig } from "./email.model.js";

export const createConfig = async (data) => {
  return await EmailConfig.create(data);
};

export const getConfigByUserId = async (userId) => {
  return await EmailConfig.find({ userId });
};

export const updateConfig = async (id, userId, data) => {
  return await EmailConfig.findOneAndUpdate({ _id: id, userId }, data, { new: true });
};

export const deleteConfig = async (id, userId) => {
  return await EmailConfig.findOneAndDelete({ _id: id, userId });
};
