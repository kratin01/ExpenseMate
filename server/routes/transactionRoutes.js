import { Router } from 'express';
const router = Router();
import auth from '../middlewares/auth.js';
import { createTransaction, getTransactions, getSummary, getOverallSummary, updateTransaction, deleteTransaction } from '../controllers/transactionController.js';

router.use(auth);
router.post('/', createTransaction);
router.get('/', getTransactions);
router.get('/summary', getSummary);
router.get('/overall-summary', getOverallSummary);
router.put('/:id',updateTransaction)
router.delete('/:id', deleteTransaction);

export default router;