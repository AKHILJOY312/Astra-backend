import { inject, injectable } from "inversify";
import { TYPES } from "@/config/types";
import { IProjectRepository } from "../../ports/repositories/IProjectRepository";
import { IProjectMembershipRepository } from "../../ports/repositories/IProjectMembershipRepository";
import { Project } from "../../../domain/entities/project/Project";
import { NotFoundError, UnauthorizedError } from "@/application/error/AppError";

export interface UpdateProjectDTO {
  projectId: string;
  userId: string;
  projectName?: string;
  description?: string;
  imageUrl?: string | null;
}

export interface UpdateProjectResultDTO {
  project: Project;
}

@injectable()
export class UpdateProjectUseCase {
  constructor(
    @inject(TYPES.ProjectRepository)
    private projectRepo: IProjectRepository,

    @inject(TYPES.ProjectMembershipRepository)
    private membershipRepo: IProjectMembershipRepository
  ) {}

  async execute(input: UpdateProjectDTO): Promise<UpdateProjectResultDTO> {
    const { projectId, userId, projectName, description, imageUrl } = input;

    // 1️ Fetch project
    const project = await this.projectRepo.findById(projectId);
    if (!project) {
      throw new NotFoundError("Project");
    }

    // 2️ Authorization
    if (project.ownerId !== userId) {
      const membership = await this.membershipRepo.findByProjectAndUser(
        projectId,
        userId
      );

      if (!membership || membership.role !== "manager") {
        throw new UnauthorizedError("You are not allowed to edit this project");
      }
    }

    // 3️ Update entity using domain methods
    if (projectName !== undefined) {
      project.updateName(projectName);
    }

    if (description !== undefined) {
      project.updateDescription(description);
    }

    if (imageUrl !== undefined) {
      project.updateImageUrl(imageUrl);
    }

    // 4️ Persist changes
    await this.projectRepo.update(project);

    return { project };
  }
}
