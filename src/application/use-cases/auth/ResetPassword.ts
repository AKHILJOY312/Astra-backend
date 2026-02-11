// src/application/use-cases/ResetPassword.ts
import { inject, injectable } from "inversify";
import { IUserRepository } from "../../ports/repositories/IUserRepository";
import { IAuthService } from "../../ports/services/IAuthService";
import { TYPES } from "@/config/di/types";
import { BadRequestError } from "@/application/error/AppError";
import { IResetPassword } from "@/application/ports/use-cases/auth/IResetPasswordUseCase";

@injectable()
export class ResetPassword implements IResetPassword {
  constructor(
    @inject(TYPES.UserRepository) private _userRepo: IUserRepository,
    @inject(TYPES.AuthService) private _authSvc: IAuthService,
  ) {}

  async execute(
    token: string,
    password: string,
    confirmPassword: string,
  ): Promise<{ message: string; role: "admin" | "user" }> {
    if (!token) throw new Error("Invalid token");
    if (!password || !confirmPassword)
      throw new BadRequestError("Both passwords are required");
    if (password !== confirmPassword)
      throw new BadRequestError("Passwords do not match");

    const user = await this._userRepo.findByResetToken(token);
    if (!user) throw new BadRequestError("Invalid or expired token");
    const hashed = await this._authSvc.hashPassword(password);

    try {
      user.resetPassword(hashed, token);
    } catch (error) {
      if (
        error instanceof Error &&
        (error.message.includes("Invalid reset token") ||
          error.message.includes("expired"))
      ) {
        throw new BadRequestError(error.message);
      }
      // Unexpected error → rethrow (will become 500)
      throw error;
    }

    await this._userRepo.update(user);

    return {
      message: "Password reset successfully",
      role: user.isAdmin ? "admin" : "user",
    };
  }
}
