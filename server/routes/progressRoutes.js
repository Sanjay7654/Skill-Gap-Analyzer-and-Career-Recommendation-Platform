import express from 'express';
import { logProgress, getSkillProgress, getEvolutionData } from '../controllers/progressController.js';

const router = express.Router();
router.post('/', logProgress);
router.get('/:userId', getSkillProgress);
router.get('/evolution/:userId', getEvolutionData);

export default router;