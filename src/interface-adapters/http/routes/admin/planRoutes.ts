// src/interfaces/http/routes/planRoutes.ts
import { Router } from "express";
import { planController } from "../../../../config/container";
import { protect } from "../../../../config/container";
import { adminOnly } from "../../../../infra/middleware/adminOnly";

const router = Router();

router.use(protect, adminOnly);

router.route("/").post(planController.create).get(planController.getAll);

router.route("/:id").put(planController.update).delete(planController.delete);

export default router;
