// src/application/errors/AppError.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string // e.g., "USER_NOT_FOUND"
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific errors (optional but clean)
export class NotFoundError extends AppError {
  constructor(entity: string) {
    super(`${entity} not found`, 404, `${entity}_NOT_FOUND`);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, "VALIDATION_ERROR");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403, "FORBIDDEN");
  }
}
export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400, "BAD_REQUEST");
  }
}

export class PlanLimitError extends ForbiddenError {
  public readonly upgradeRequired = true;

  constructor(maxProjects: number) {
    super(
      `You've reached the limit of ${maxProjects} project${
        maxProjects === 1 ? "" : "s"
      }. Upgrade your plan to create more.`
    );
    this.name = "PlanLimitError";
  }
}
export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, 409, "CONFLICT");
  }
}

export class TooManyRequestError extends AppError {
  constructor(message = "Too Many Requests") {
    super(message, 429, "TOO_MANY_REQUESTS");
  }
}
