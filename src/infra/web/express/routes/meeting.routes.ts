import { Router } from "express";
import { Container } from "inversify";
import { TYPES } from "@/config/di/types";
import { MeetingController } from "@/interface-adapters/controllers/meeting/MeetingController";
import { asyncHandler } from "../handler/asyncHandler";
import { API_ROUTES } from "@/config/routes.config";

export function getMeetingRoutes(container: Container): Router {
  const router = Router();

  const meetingController = container.get<MeetingController>(
    TYPES.MeetingController,
  );

  router
    .route(API_ROUTES.BASE)
    .post(
      asyncHandler(meetingController.createMeeting.bind(meetingController)),
    );

  router
    .route(API_ROUTES.MEETING.CODE)
    .get(
      asyncHandler(meetingController.validateMeeting.bind(meetingController)),
    );

  router
    .route(API_ROUTES.MEETING.LEAVE)
    .post(asyncHandler(meetingController.leaveMeeting.bind(meetingController)));

  return router;
}
