import { inject, injectable } from "inversify";
import { IUserRepository } from "../../ports/repositories/IUserRepository";
import { IAuthService } from "../../ports/services/IAuthService";
import { TYPES } from "@/config/types";
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from "@/application/error/AppError";

@injectable()
export class RefreshToken {
  constructor(
    @inject(TYPES.UserRepository) private userRepo: IUserRepository,
    @inject(TYPES.AuthService) private auth: IAuthService
  ) {}

  async execute(refreshToken: string): Promise<{ accessToken: string }> {
    const payload = this.auth.verifyRefreshToken(refreshToken);
    if (!payload)
      throw new BadRequestError("Refresh token is missing or invalid");

    const user = await this.userRepo.findById(payload.id);
    if (!user) throw new UnauthorizedError("Invalid or expired refresh token");
    if (user.isBlocked) {
      throw new ForbiddenError(
        "Your account has been blocked. Please contact support."
      );
    }

    const accessToken = this.auth.generateAccessToken(
      user.id!,
      user.email,
      user.securityStamp!
    );
    return { accessToken };
  }
}
