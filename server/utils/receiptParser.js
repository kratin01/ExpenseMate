// utils/receiptParser.js
export const parseReceiptText = (text) => {
  const lines = text.split("\n");
  let total = null;
  let date = null;

  const amountPattern = /(\d+\.\d{2})/g;
  const amounts = [];

  const datePatterns = [
    /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})\b/,   // 29/07/2025 or 07-29-25
    /\b(\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2})\b/,     // 2025-07-29
    /\b(\d{1,2}\s+[A-Za-z]{3,}\s+\d{4})\b/,      // 29 Jul 2025
    /\b([A-Za-z]{3,}\s+\d{1,2},\s+\d{4})\b/,     // Jul 29, 2025
  ];

  lines.forEach((line) => {
    const cleanLine = line.trim();

    // Extract date
    if (!date) {
      for (const pattern of datePatterns) {
        const match = cleanLine.match(pattern);
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
    const matches = cleanLine.match(amountPattern);
    if (matches) amounts.push(...matches.map(parseFloat));
  });

  if (amounts.length > 0) {
    total = Math.max(...amounts);
  }

  return { total, date };
};
