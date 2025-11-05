import { Task } from '../../domain/entities/task/Task';

export interface TaskRepository {
  save(entity: Task): Promise<void>;
  findById(id: string): Promise<Task | null>;
  // Add more as needed
}
