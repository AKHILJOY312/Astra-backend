import { User, CreateUserInput } from '../../../domain/entities/user/User';
import { UserRepository } from '../../repositories/UserRepository';

export class RegisterUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    // Business rules: email format, password strength, etc.
    if (!input.email.includes('@')) throw new Error('Invalid email');
    
    const user: User = {
      id: crypto.randomUUID(),
      email: input.email,
      name: input.name,
      role: 'member',
      projectIds: [],
      premium: false,
      createdAt: new Date()
    };

    await this.userRepo.save(user);
    return user;
  }
}
