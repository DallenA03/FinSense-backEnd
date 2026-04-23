/**
 * Regular expression based parser for transaction emails.
 * These patterns should be adjusted based on the specific bank/service email format.
 */

export const parseTransactionEmail = (text) => {
  // Common patterns for amount (e.g., Rp 50.000, IDR 100,000, $50.00)
  const amountRegex = /(?:Rp|IDR|USD|\$)\s?([\d,.]+)/i;
  
  // Common patterns for dates
  const dateRegex = /(\d{2}[-/]\d{2}[-/]\d{4}|\d{4}[-/]\d{2}[-/]\d{2})/;
  
  // Common patterns for description/merchant (often after "at", "to", or "from")
  const descRegex = /(?:at|to|from|pembayaran)\s+([^.\n\r]+)/i;

  const amountMatch = text.match(amountRegex);
  const dateMatch = text.match(dateRegex);
  const descMatch = text.match(descRegex);

  let amount = 0;
  if (amountMatch) {
    // Remove thousand separators and handle decimals
    amount = parseFloat(amountMatch[1].replace(/[,.]/g, (m) => (m === "." ? "" : ""))); 
    // Simplified logic: adjust based on currency format
    amount = parseFloat(amountMatch[1].replace(/,/g, ''));
  }

  return {
    amount: amount || 0,
    transactionDate: dateMatch ? new Date(dateMatch[1]) : new Date(),
    description: descMatch ? descMatch[1].trim() : "Automated Transaction from Email",
    type: "expense", // Default to expense for notifications, can be refined
    source: "email",
  };
};
