import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "@/application/error/AppError";
import { IEmailChangeOtpRepository } from "@/application/ports/repositories/IEmailChangeOtpRepository";
import { IUserRepository } from "@/application/ports/repositories/IUserRepository";
import { IAuthService } from "@/application/ports/services/IAuthService";
import { IVerifyEmailChangeUseCase } from "@/application/ports/use-cases/user/IVerifyEmailChangeUseCase";
import { TYPES } from "@/config/types";
import { inject, injectable } from "inversify";

injectable();
export class VerifyEmailChangeUseCase implements IVerifyEmailChangeUseCase {
  constructor(
    @inject(TYPES.UserRepository) private userRepo: IUserRepository,
    @inject(TYPES.EmailChangeOtpRepository)
    private otpRepo: IEmailChangeOtpRepository,
    @inject(TYPES.AuthService) private auth: IAuthService
  ) {}

  async execute(userId: string, otp: string) {
    const record = await this.otpRepo.findByUserId(userId);
    if (!record || record.expiresAt < new Date()) {
      throw new BadRequestError("Invalid or expired OTP");
    }

    if (record.attempts >= 5) {
      await this.otpRepo.deleteByUserId(userId);
      throw new UnauthorizedError("Too many failed attempts");
    }

    const isValid = await this.auth.comparePassword(otp, record.otpHash);
    if (!isValid) {
      await this.otpRepo.incrementAttempts(userId);
      throw new UnauthorizedError("Invalid OTP");
    }

    const user = await this.userRepo.findById(userId);
    if (!user) throw new NotFoundError("User");

    user.setEmail(record.newEmail);
    //user.verify();

    await this.userRepo.update(user);

    await this.auth.invalidateUserSessions(userId);
    await this.otpRepo.deleteByUserId(userId);

    return { message: "Email changed successfully", newEmail: record.newEmail };
  }
}
