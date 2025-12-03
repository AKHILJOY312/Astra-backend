export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Login successful",
  REGISTER_SUCCESS: "User registered successfully",
  EMAIL_VERIFIED: "Email verified successfully",
  LOGOUT_SUCCESS: "Logged out successfully",
  RESET_SUCCESS: "Password reset successful",
  RESET_TOKEN_VALID: "Reset token verified",
  NO_REFRESH_TOKEN: "No refresh token provided",
  EMAIL_SENT: "Email sent",
  PASSWORD_RESET_SUCCESS: "Password reset successfully",
  EMAIL_REQUIRED: "Email is required",

  ACCESS_DENIED_NO_AUTH: "Access denied. No authentication.",
  ADMIN_ACCESS_REQUIRED: "Admin access required.",
};

export const ERROR_MESSAGES = {
  INVALID_TOKEN: "Invalid token",
  LOGIN_FAILED: "Invalid email or password",
  SOMETHING_WENT_WRONG: "Something went wrong",
  FAILED_FETCH: "Failed to fetch projects",
  USER_NOT_FOUND: "User no longer exists",
  TOKEN_INVALID_OR_EXPIRED: "Not authorized, token failed",
};

export const PLAN_MESSAGES = {
  // Success
  PLAN_CREATED: "Plan created successfully",
  PLAN_UPDATED: "Plan updated successfully",
  PLAN_DELETED: "Plan deleted",

  // Generic / Fallback
  PLAN_UPDATE_FAILED: "Failed to update plan",
} as const;

export const SUB_MESSAGE = {
  // Success
  ORDER_CREATED: "Order created successfully",

  // Validation Errors
  PLAN_ID_REQUIRED: "planId is required",

  // Fallback / Generic Errors
  UPGRADE_FAILED: "Upgrade failed",
} as const;
