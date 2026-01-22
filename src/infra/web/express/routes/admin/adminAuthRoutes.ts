import { Router } from "express";
import { Container } from "inversify";
import { TYPES } from "@/config/di/types";
import { AdminAuthController } from "@/interface-adapters/controllers/auth/AdminAuthController";
import { API_ROUTES } from "@/config/routes.config";
import { asyncHandler } from "../../handler/asyncHandler";

export function getAdminAuthRoutes(container: Container): Router {
  const router = Router();

  const adminAuthController = container.get<AdminAuthController>(
    TYPES.AdminAuthController
  );

  router.post(
    API_ROUTES.AUTH.LOGIN,
    asyncHandler(adminAuthController.login.bind(adminAuthController))
  );
  router.post(
    API_ROUTES.AUTH.FORGOT_PASSWORD,
    asyncHandler(adminAuthController.forgotPassword.bind(adminAuthController))
  );
  router.post(
    API_ROUTES.AUTH.RESET_PASSWORD,
    asyncHandler(adminAuthController.resetPassword.bind(adminAuthController))
  );

  return router;
}
