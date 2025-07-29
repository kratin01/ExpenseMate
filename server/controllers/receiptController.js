// controllers/receiptController.js
import { processReceipt } from "../services/receiptService.js";

export const extractReceipt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res
        .status(400)
        .json({ error: "Invalid file type. Please upload an image (JPEG, PNG, WEBP)." });
    }

    const { total, date } = await processReceipt(req.file.buffer);

    if (!total) {
      return res
        .status(400)
        .json({ error: "Could not extract total amount from the receipt." });
    }

    res.json({
      amount: total,
      date: date || new Date(),
      category: "Bills",
      description: "POS Receipt Purchase",
      type: "expense",
    });
  } catch (error) {
    console.error("Receipt processing error:", error);
    res.status(500).json({ error: "Receipt processing failed." });
  }
};
