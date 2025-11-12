import express from 'express';
import {
  createStat,
  getStats,
  deleteStat,
} from '../controllers/statsController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/', createStat);
router.get('/', getStats);
router.delete('/:id', deleteStat);

export default router;
