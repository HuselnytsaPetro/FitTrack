import express from 'express';
import { getWorkouts } from '../controllers/workoutController.js';

const router = express.Router();

router.get('/:category/:title', getWorkouts);

export default router;