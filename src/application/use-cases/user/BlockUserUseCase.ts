// src/application/usecases/BlockUserUseCase.ts
import { IUserRepository } from "../../repositories/IUserRepository";
import { IAuthService } from "../../services/IAuthService"; // Assuming an AuthService exists

export class BlockUserUseCase {
  constructor(
    private userRepo: IUserRepository,
    private authService: IAuthService // For invalidating JWT/session
  ) {}

  async execute(userId: string) {
    const user = await this.userRepo.findById(userId);
    console.log("working4");
    if (!user) throw new Error("User not found");
    console.log("User befor: ", user);
    const isBlocked = user.isBlocked;
    // 1. Flip status on the User entity
    user.setBlockStatus(!isBlocked);
    // 2. Persist the change
    await this.userRepo.updateStatus(user.id!); // Use existing save/updateStatus (if created)
    console.log("user after: ", user);
    // 3. Invalidate JWT/session immediately
    if (user.isBlocked) {
      console.log("working inside the is Blocked is true");
      await this.authService.invalidateUserSessions(userId);
    }

    return {
      id: user.id!,
      name: user.name,
      email: user.email,
      status: user.isBlocked ? "blocked" : "active",
    };
  }
}
