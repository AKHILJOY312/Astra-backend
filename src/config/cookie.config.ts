// src/config/cookie.config.ts
export const REFRESH_TOKEN_COOKIE_CONFIG = {
  name: "refreshToken",
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge:
      Number(process.env.REFRESH_TOKEN_EXPIRY_MS) || 7 * 24 * 60 * 60 * 1000,
    path: "/",
  },
} as const;
