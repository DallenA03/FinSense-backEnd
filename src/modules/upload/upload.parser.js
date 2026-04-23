import { parse } from "csv-parse/sync";
import pdf from "pdf-parse/lib/pdf-parse.js";

export const parseCSV = (buffer) => {
  try {
    const records = parse(buffer, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
    
    // Map CSV columns to Transaction Schema
    // This assumes a certain CSV structure, usually you'd need to map these dynamically
    return records.map((record) => ({
      amount: parseFloat(record.amount || record.Amount),
      type: (record.type || record.Type || "expense").toLowerCase(),
      category: record.category || record.Category || "Uncategorized",
      description: record.description || record.Description || "No description",
      transactionDate: new Date(record.date || record.Date || Date.now()),
      referenceId: record.referenceId || record.id || record.Reference,
    }));
  } catch (error) {
    throw new Error("Failed to parse CSV file");
  }
};

export const parsePDF = async (buffer) => {
  try {
    const data = await pdf(buffer);
    const text = data.text;
    
    // PDF parsing usually requires complex Regex specific to bank statements.
    // This is a placeholder implementation that returns raw text or mock data.
    // In a real scenario, you'd apply regex patterns here.
    
    return [
      {
        description: "Extracted from PDF (Sample)",
        amount: 0,
        type: "expense",
        category: "Other",
        transactionDate: new Date(),
        rawText: text.substring(0, 100), // for debugging
      }
    ];
  } catch (error) {
    throw new Error("Failed to parse PDF file");
  }
};
