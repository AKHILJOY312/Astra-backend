import { Router } from "express";
import {
  register,
  verifyEmail,
  login,
  refreshToken,
  logout,
  me,
} from "../controllers/auth/AuthController";
import { protect } from "../../frameworks/middleware/protect";

const router = Router();
router.post("/register", register);
router.get("/verify-email", verifyEmail);
router.post("/login", login);
router.get("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/me", protect, me);
export default router;
