import { z } from "zod";
import { passwordSchema } from "./baseValidators";

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  newPassword: passwordSchema, // Use your reusable complexity schema here!
});

export const updateProfileSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .optional(),

    about: z
      .string()
      .max(300, "About section must be under 300 characters")
      .optional(),

    phone: z
      .string()
      .regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number")
      .optional(),

    link: z.string().url("Invalid URL").optional(),

    email: z.string().email("Invalid email address").optional(),
  })
  .strict();
