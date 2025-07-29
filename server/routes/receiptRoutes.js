import express from 'express';
import { extractReceipt } from '../controllers/receiptController.js';
import auth from '../middlewares/auth.js';
import multer from 'multer';

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

const router = express.Router();

router.post(
  '/extract', 
  auth,
  upload.single('receipt'),
  extractReceipt
);

export default router;