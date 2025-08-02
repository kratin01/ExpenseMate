import { processReceipt } from "../services/receiptService.cjs";

/**
 * Controller: Extracts receipt details from uploaded file
 * - Validates file type
 * - Processes receipt to extract amount, store name, date
 * - Converts USD to INR if needed
 * - Rounds total to 2 decimal places
 */
export const extractReceipt = async (req, res) => {
  try {
    // Ensure file exists
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Allowed file formats
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    // Validate file type
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        error: "Invalid file type. Please upload an image (JPEG, PNG, WEBP) or PDF.",
      });
    }

    // Process receipt and extract details
    const { total, date, storeName, wasUSD, originalUSD } = await processReceipt(req.file);

    // If no amount detected
    if (!total) {
      return res.status(400).json({
        error: "Could not extract total amount from the receipt.",
      });
    }

    // Round amount to 2 decimal places
    const roundedTotal = Number(total.toFixed(2));

    // Create description
    let description = storeName 
      ? `Purchase at ${storeName}`
      : "POS/PDF Receipt Purchase";

    // Add USD → INR conversion note if applicable
    if (wasUSD) {
      description += ` (Converted from $${originalUSD.toFixed(2)} USD to INR)`;
    }

    // Send response
    res.json({
      amount: roundedTotal,
      date: date || new Date(),
      category: "Bills",
      description,
      type: "expense",
    });

  } catch (error) {
    console.error("Receipt processing error:", error);
    res.status(500).json({ error: error.message || "Receipt processing failed." });
  }
};
