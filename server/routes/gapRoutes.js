import express from "express";
import { getTopRoles, saveAssessment, getResources, getDetailedGaps } from "../controllers/gapController.js";

const router = express.Router();

router.get("/top-roles/:userId", getTopRoles);
router.get("/detailed/:userId/:roleTitle", getDetailedGaps);
router.post("/assess", saveAssessment);
router.get("/resources", getResources);

export default router;
