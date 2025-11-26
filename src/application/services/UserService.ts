import { IUserRepository } from "../repositories/IUserRepository";

export class UserService {
  constructor(private userRepo: IUserRepository) {}

  async findUserIdByEmail(email: string): Promise<string | null> {
    const user = await this.userRepo.findByEmail(email);
    return user?.id ?? null;
  }
}
