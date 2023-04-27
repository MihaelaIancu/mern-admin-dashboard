import express from "express";
import {
  signup,
  login,
  verifyToken,
  getUser,
  logout,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login, verifyToken, getUser);
// router.get("/user", verifyToken, getUser);
router.post("/logout", verifyToken, logout);

export default router;
