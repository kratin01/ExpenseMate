// services/receiptService.js
import Tesseract from "tesseract.js";
import { parseReceiptText } from "../utils/receiptParser.js";

export const processReceipt = async (fileBuffer) => {
  const {
    data: { text },
  } = await Tesseract.recognize(fileBuffer);

  return parseReceiptText(text);
};
