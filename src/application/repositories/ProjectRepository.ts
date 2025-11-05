import { Project } from '../../domain/entities/project/Project';

export interface ProjectRepository {
  save(entity: Project): Promise<void>;
  findById(id: string): Promise<Project | null>;
  // Add more as needed
}
