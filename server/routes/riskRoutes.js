import express from 'express';
import { getCareerRisk, getAllRiskScores } from '../controllers/riskController.js';

const router = express.Router();

// GET /api/risk/:userId         → all saved risk scores for user
router.get('/:userId', getAllRiskScores);

// GET /api/risk/:userId/:roleId → calculate + save risk for specific role
router.get('/:userId/:roleId', getCareerRisk);

export default router;
