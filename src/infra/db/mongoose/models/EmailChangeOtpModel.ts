import {
  EmailChangeOtp,
  EmailChangeOtpProps,
} from "@/domain/entities/auth/EmailChangeOtp";
import mongoose, { Document, Schema, Types } from "mongoose";

export interface EmailChangeOtpDoc extends Document {
  userId: Types.ObjectId;
  newEmail: string;
  otpHash: string;
  attempts: number;
  // requestTimeStamps: Date[];
  expiresAt: Date;
  createAt?: Date;
  updatedAt?: Date;
}

const emailChangeOtpSchema = new Schema<EmailChangeOtpDoc>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    newEmail: { type: String, required: true, lowercase: true, trim: true },
    otpHash: { type: String, required: true },
    attempts: { type: Number, default: 0 },
    // requestTimeStamps: {
    //   type: [Date],
    //   default: [],
    // },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

emailChangeOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const EmailChangeOtpModal = mongoose.model<EmailChangeOtpDoc>(
  "EmailChangeOtp",
  emailChangeOtpSchema
);

export const toEmailChangeOtpEntity = (
  doc: EmailChangeOtpDoc
): EmailChangeOtp => {
  const props: EmailChangeOtpProps = {
    userId: doc.userId.toString(),
    newEmail: doc.newEmail,
    otpHash: doc.otpHash,
    attempts: doc.attempts,
    // requestTimeStamps: doc.requestTimeStamps,
    expiresAt: doc.expiresAt,
    createdAt: doc.createAt,
  };
  return new EmailChangeOtp(props);
};
