const Tesseract = require("tesseract.js");
const pdf = require("pdf-parse");
const { parseReceiptText } = require("../utils/receiptParser");

/**
 * Processes receipt file (PDF or Image)
 * - Uses pdf-parse for PDFs
 * - Uses Tesseract OCR for images
 * - Returns extracted details
 */
const processReceipt = async (file) => {
  console.log("📄 Processing file:", {
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
    hasBuffer: !!file.buffer,
    isBuffer: Buffer.isBuffer(file.buffer),
  });

  // Validate buffer
  if (!file.buffer || !Buffer.isBuffer(file.buffer)) {
    throw new Error("File buffer is missing or invalid. Check multer configuration.");
  }

  let text = "";

  // Process PDF
  if (file.mimetype === "application/pdf") {
    try {
      const pdfData = await pdf(file.buffer);
      text = pdfData.text;
    } catch (err) {
      console.error("PDF parsing error:", err);
      throw new Error("Failed to parse PDF file.");
    }
  }
  // Process Image (OCR)
  else {
    try {
      const { data: { text: ocrText } } = await Tesseract.recognize(file.buffer, "eng");
      text = ocrText;
    } catch (err) {
      console.error("Image OCR error:", err);
      throw new Error("Failed to process image file.");
    }
  }

  return parseReceiptText(text);
};

module.exports = { processReceipt };
