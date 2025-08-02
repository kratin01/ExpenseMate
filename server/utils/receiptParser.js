/**
 * Parses extracted text from receipt (OCR or PDF)
 * - Detects store name
 * - Detects date
 * - Detects total amount
 * - Converts USD → INR if necessary
 */
export const parseReceiptText = (text) => {
  // Clean & split receipt text
  const lines = text
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  let total = null;
  let date = null;
  let storeName = null;
  let wasUSD = false;
  let originalUSD = null;

  // USD to INR conversion rate
  const conversionRateUSDToINR = 83.5;

  // Patterns for amount & date detection
  const amountPattern = /(\d+\.\d{2})/g;
  const amounts = [];
  const datePatterns = [
    /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})\b/,   // 29/07/2025 or 07-29-25
    /\b(\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2})\b/,     // 2025-07-29
    /\b(\d{1,2}\s+[A-Za-z]{3,}\s+\d{4})\b/,      // 29 Jul 2025
    /\b([A-Za-z]{3,}\s+\d{1,2},\s+\d{4})\b/,     // Jul 29, 2025
  ];

  // 🔍 Detect store name from first few lines
  for (let i = 0; i < Math.min(lines.length, 6); i++) {
    const line = lines[i];
    if (
      /store|mart|supermarket|shop|retail|bazaar|outlet|market/i.test(line) ||
      /^[A-Z\s]{3,}$/.test(line)
    ) {
      storeName = line.replace(/(receipt|invoice)/ig, "").trim();
      break;
    }
  }

  // 🔍 Check for USD presence
  if (/\$|USD/i.test(text)) {
    wasUSD = true;
  }

  // 🔍 Detect date & amounts
  lines.forEach((line) => {
    // Extract date
    if (!date) {
      for (const pattern of datePatterns) {
        const match = line.match(pattern);
        if (match) {
          const parsedDate = new Date(match[0]);
          if (!isNaN(parsedDate)) {
            date = parsedDate;
            break;
          }
        }
      }
    }

    // Extract amounts
    const matches = line.match(amountPattern);
    if (matches) amounts.push(...matches.map(parseFloat));
  });

  // Determine total
  if (amounts.length > 0) {
    total = Math.max(...amounts);
    
    // If USD, convert to INR
    if (wasUSD) {
      originalUSD = total;
      total = total * conversionRateUSDToINR;
    }
  }

  return { total, date, storeName, wasUSD, originalUSD };
};
