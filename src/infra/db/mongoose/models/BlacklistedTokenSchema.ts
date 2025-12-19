import mongoose from "mongoose";

const BlacklistedTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true, // prevents duplicates
      index: true, // fast lookup
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 0 }, // MongoDB auto-delete when expired!
    },
  },
  {
    timestamps: true,
  }
);

export const BlacklistedTokenModel = mongoose.model(
  "BlacklistedToken",
  BlacklistedTokenSchema
);
