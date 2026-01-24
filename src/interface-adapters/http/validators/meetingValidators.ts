import { z } from "zod";

export const CreateMeetingSchema = z.object({
  maxParticipants: z.number().min(1).max(50).optional(),
});

export const JoinMeetingSchema = z.object({
  code: z.string().length(8),
  socketId: z.string().min(1),
});

export const LeaveMeetingSchema = z.object({
  code: z.string().length(8),
  socketId: z.string().min(1),
});
