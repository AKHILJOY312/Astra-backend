import { Project } from '../../../domain/entities/project/Project';
import { ProjectRepository } from '../../repositories/ProjectRepository';
import { UserRepository } from '../../repositories/UserRepository';

export class CreateProjectUseCase {
  constructor(
    private projectRepo: ProjectRepository,
    private userRepo: UserRepository
  ) {}

  async execute(userId: string, name: string): Promise<Project> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');

    const project: Project = {
      id: crypto.randomUUID(),
      name,
      ownerId: userId,
      channelIds: [],
      taskBoardId: crypto.randomUUID(),
      memberIds: [userId],
      isPremium: false,
      createdAt: new Date()
    };

    await this.projectRepo.save(project);
    user.projectIds.push(project.id);
    await this.userRepo.save(user);

    return project;
  }
}
