import express from 'express';
import { getTopCareers } from '../controllers/suitabilityController.js';

const router = express.Router();

router.get('/top-roles/:userId', getTopCareers);

export default router;
