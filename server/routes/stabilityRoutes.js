import express from 'express';
import { getSkillStability, getStabilityHistory } from '../controllers/stabilityController.js';

const router = express.Router();

// GET /api/stability/:userId          → calculate + save current stability score
router.get('/:userId', getSkillStability);

// GET /api/stability/history/:userId  → historical stability trend
router.get('/history/:userId', getStabilityHistory);

export default router;
