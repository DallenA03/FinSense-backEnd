import { GoogleGenerativeAI } from "@google/generative-ai";
import * as analyticsService from "../analytics/analytics.service.js";

// Initialize Google Generative AI with GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const categorizeTransaction = async (description) => {
  const prompt = `Categorize the following transaction description into a single generic category word (e.g., Food, Transport, Utilities, Entertainment, Salary, Health, Shopping, etc.):\n\nDescription: "${description}"\n\nReturn only the category name string, no punctuation.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Gemini AI Error (Categorization):", error);
    return "Uncategorized";
  }
};

export const generateInsights = async (userId, year, month) => {
  // Gather contextual data for the AI to analyze
  const breakdown = await analyticsService.getCategoryBreakdown(userId, year, month, "expense");
  const summary = await analyticsService.getMonthlySummary(userId, year, month);

  const prompt = `Analyze this personal finance data for month ${month}/${year}:
  Income: ${summary.income}
  Expense: ${summary.expense}
  Category Breakdown: ${JSON.stringify(breakdown)}
  
  Provide 2 to 3 short, actionable financial insights or advice based on their spending habits. Use a supportive and professional tone. Return the response in a concise format.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Gemini AI Error (Insights):", error);
    return "We are currently unable to generate insights at the moment. Keep tracking your expenses!";
  }
};

export const checkBudgetCrossing = async (userId, year, month, categoryBudgets) => {
  const breakdown = await analyticsService.getCategoryBreakdown(userId, year, month, "expense");
  const notifications = [];

  for (const item of breakdown) {
    const budgetLimit = categoryBudgets[item.category];
    if (budgetLimit && item.totalAmount > budgetLimit) {
      notifications.push({
        category: item.category,
        spent: item.totalAmount,
        budget: budgetLimit,
        message: `Alert: Your ${item.category} expenses (${item.totalAmount}) have crossed your monthly budget (${budgetLimit}).`
      });
    }
  }

  return notifications;
};
