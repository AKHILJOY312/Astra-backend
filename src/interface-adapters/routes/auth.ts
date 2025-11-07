import { Router } from "express";
import { register, verifyEmail } from "../controllers/auth/AuthController";

const router = Router();
router.get("/register", (req, res) => {
  res.end("working");
});
router.post("/register", register);
router.get("/verify-email", verifyEmail);

export default router;
