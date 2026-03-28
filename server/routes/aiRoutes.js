import express from "express";
import { generateQuizQuestions, generateStudyRoadmap } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-quiz", generateQuizQuestions);
router.post("/generate-roadmap", generateStudyRoadmap);

export default router;
