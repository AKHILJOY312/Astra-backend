import { inject, injectable } from "inversify";
import { TYPES } from "@/config/di/types";
import { UnauthorizedError } from "@/application/error/AppError";

import { TaskResponseDTO } from "@/application/dto/task/taskDto";
import { Task } from "@/domain/entities/task/Task";
import { IGetProjectTasksUseCase } from "@/application/ports/use-cases/task/interfaces";
import { ITaskRepository } from "@/application/ports/repositories/ITaskRepository";
import { IProjectMembershipRepository } from "@/application/ports/repositories/IProjectMembershipRepository";

@injectable()
export class GetProjectTasksUseCase implements IGetProjectTasksUseCase {
  constructor(
    @inject(TYPES.TaskRepository)
    private taskRepo: ITaskRepository,

    @inject(TYPES.ProjectMembershipRepository)
    private membershipRepo: IProjectMembershipRepository,
  ) {}

  async execute(
    projectId: string,
    requesterId: string,
  ): Promise<TaskResponseDTO[]> {
    // 1. Must be project member
    const membership = await this.membershipRepo.findByProjectAndUser(
      projectId,
      requesterId,
    );

    if (!membership) {
      throw new UnauthorizedError("You are not a project member");
    }

    // 2. Load tasks
    const tasks =
      membership.role === "manager"
        ? await this.taskRepo.findByProjectId(projectId)
        : await this.taskRepo.findByAssignedTo(requesterId);

    // 3. Map to response DTO
    return tasks.map(this.mapToResponse);
  }

  private mapToResponse(task: Task): TaskResponseDTO {
    return {
      id: task.id!,
      projectId: task.projectId,
      assignedTo: {
        id: task.assignedTo,
        name: "",
      },
      title: task.title,
      description: task.description ?? null,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate?.toISOString() ?? null,
      hasAttachments: task.hasAttachments ?? false,
      createdAt: task.createdAt.toISOString(),
    };
  }
}
