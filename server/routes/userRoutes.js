import express from "express";
import { getAllUsers, createUser, deleteUser, createProfile } from "../controllers/userController.js";
import { signup, login, forgotPassword, resetPassword } from "../controllers/authController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/profile", createProfile);
router.delete("/:id", deleteUser);

export default router;

