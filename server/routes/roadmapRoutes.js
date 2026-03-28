import express from 'express';
import {
    getRoadmapByRole,
    getRoadmapForUser,
    getAllRoles
} from '../controllers/roadmapController.js';

const router = express.Router();

// GET /api/roadmap/all-roles          → list all career roles
router.get('/all-roles', getAllRoles);

// GET /api/roadmap/user/:userId       → roadmap for user's top career match
router.get('/user/:userId', getRoadmapForUser);

// GET /api/roadmap/role/:roleId       → full roadmap for a specific role
router.get('/role/:roleId', getRoadmapByRole);

export default router;
