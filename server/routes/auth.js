import express from "express";
import {
  signup,
  login,
  verifyToken,
  getUser,
  logout,
  refreshToken
} from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login, verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, refreshToken, getUser, logout);

export default router;
