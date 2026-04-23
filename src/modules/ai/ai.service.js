import OpenAI from "openai";
import * as analyticsService from "../analytics/analytics.service.js";

// Initialize OpenAI. Make sure OPENAI_API_KEY is available in your environment variables.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const categorizeTransaction = async (description) => {
  const prompt = `Categorize the following transaction description into a single generic category word (e.g., Food, Transport, Utilities, Entertainment, Salary, Health, Shopping, etc.):\n\nDescription: "${description}"\n\nCategory:`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Switch to gpt-4 or gpt-4o if preferred
      messages: [{ role: "user", content: prompt }],
      max_tokens: 10,
      temperature: 0.3, // Low temperature for more deterministic/consistent categorization
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI Error:", error);
    return "Uncategorized"; // Graceful fallback if AI fails or rate limits
  }
};

export const generateInsights = async (userId, year, month) => {
  // Gather contextual data for the AI to analyze
  const breakdown = await analyticsService.getCategoryBreakdown(userId, year, month, "expense");
  const summary = await analyticsService.getMonthlySummary(userId, year, month);

  const prompt = `Analyze this personal finance data for month ${month}/${year}:\nIncome: ${summary.income}\nExpense: ${summary.expense}\nCategory Breakdown: ${JSON.stringify(breakdown)}\n\nProvide 2 to 3 short, actionable financial insights or advice based on their spending habits. Use a supportive and professional tone.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7, // Slightly higher for natural text generation
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI Error:", error);
    return "We are currently unable to generate insights at the moment. Keep tracking your expenses!";
  }
};

export const checkBudgetCrossing = async (userId, year, month, categoryBudgets) => {
  // categoryBudgets is expected to be a key-value object: { "Food": 1500000, "Transport": 500000 }
  const breakdown = await analyticsService.getCategoryBreakdown(userId, year, month, "expense");
  const notifications = [];

  for (const item of breakdown) {
    const budgetLimit = categoryBudgets[item.category];
    // If the category has a budget limit AND the spent amount exceeds it
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
