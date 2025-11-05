import { User } from '../../domain/entities/user/User';

export interface UserRepository {
  save(entity: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  // Add more as needed
}
