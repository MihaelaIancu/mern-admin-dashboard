import express from "express";
import {
  getAdmins,
  getUserPerformance,
  signup,
  login,
  verifyToken,
  getUser,
} from "../controllers/management.js";

const router = express.Router();

router.get("/admins", getAdmins);
router.get("/performance/:id", getUserPerformance);
router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);

export default router;
