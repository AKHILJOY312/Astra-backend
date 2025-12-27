import { Router } from "express";
import { Container } from "inversify";
import { TYPES } from "@/config/types";
import { SubscriptionController } from "@/interface-adapters/controllers/plan/SubscriptionController";
import { createProtectMiddleware } from "@/infra/web/express/middleware/protect";
import { API_ROUTES } from "@/config/routes.config";
import { asyncHandler } from "../handler/asyncHandler";

export function getSubscriptionRoutes(container: Container): Router {
  const router = Router();

  const subscriptionController = container.get<SubscriptionController>(
    TYPES.SubscriptionController
  );
  const protect = container.get<ReturnType<typeof createProtectMiddleware>>(
    TYPES.ProtectMiddleware
  );

  router.use(protect);
  router.get(
    API_ROUTES.SUBSCRIPTION.PLANS,
    asyncHandler(
      subscriptionController.getPlansToSubscribe.bind(subscriptionController)
    )
  );
  router.get(
    API_ROUTES.SUBSCRIPTION.LIMITS,
    asyncHandler(subscriptionController.getLimits.bind(subscriptionController))
  );
  router.post(
    API_ROUTES.SUBSCRIPTION.RAZORPAY.ORDER,
    asyncHandler(subscriptionController.upgrade.bind(subscriptionController))
  );
  router.post(
    API_ROUTES.SUBSCRIPTION.RAZORPAY.CAPTURE,
    asyncHandler(subscriptionController.capture.bind(subscriptionController))
  );

  return router;
}
