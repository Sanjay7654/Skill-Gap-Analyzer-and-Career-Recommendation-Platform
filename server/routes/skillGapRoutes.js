import express from 'express';
import { getSkillGapDetails } from '../controllers/skillGapController.js';

const router = express.Router();
router.get('/:userId/:roleId', getSkillGapDetails);

export default router;