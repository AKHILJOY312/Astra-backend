// src/interfaces/http/routes/projectRoutes.ts
import { Router } from "express";
import { projectController, memberController } from "../../../config/container";
import { protect } from "../../../config/container";

const router = Router();

router.use(protect);
router.use((req, res, next) => {
  console.log(req.body);
  next();
});
// Project routes

router.post("/", projectController.createProject.bind(projectController));
router.get(
  "/me",
  protect,
  projectController.getUserProjects.bind(projectController)
);
// Member routes (nested under project)
router.post(
  "/:projectId/members",
  memberController.addMember.bind(memberController)
);
router.delete(
  "/:projectId/members/:memberId",
  memberController.removeMember.bind(memberController)
);
router.patch(
  "/:projectId/members/:memberId/role",
  memberController.changeRole.bind(memberController)
);

export default router;
