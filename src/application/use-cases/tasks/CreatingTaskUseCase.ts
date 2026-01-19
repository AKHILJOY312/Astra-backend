import {
  CreateTaskRequestDTO,
  TaskResponseDTO,
} from "@/application/dto/task/taskDto";
import {
  BadRequestError,
  UnauthorizedError,
} from "@/application/error/AppError";
import { IProjectMembershipRepository } from "@/application/ports/repositories/IProjectMembershipRepository";
import { ITaskRepository } from "@/application/ports/repositories/ITaskRepository";
import { ICreateTaskUseCase } from "@/application/ports/use-cases/task/interfaces";
import { TYPES } from "@/config/di/types";
import { Task } from "@/domain/entities/task/Task";
import { inject, injectable } from "inversify";

@injectable()
export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(
    @inject(TYPES.TaskRepository) private taskRepo: ITaskRepository,

    @inject(TYPES.ProjectMembershipRepository)
    private membershipRepo: IProjectMembershipRepository,
  ) {}
  async execute(
    input: CreateTaskRequestDTO,
    managerId: string,
  ): Promise<TaskResponseDTO> {
    const { projectId, assignedTo, title, description, priority, dueDate } =
      input;
    //1.Manger check
    const managerMembership = await this.membershipRepo.findByProjectAndUser(
      projectId,
      managerId,
    );
    if (!managerMembership || managerMembership.role !== "manager") {
      throw new UnauthorizedError("Only mangers and lead can create task");
    }
    //2. assigned user must be project member
    const assigneeMembership = await this.membershipRepo.findByProjectAndUser(
      projectId,
      assignedTo,
    );

    if (!assigneeMembership) {
      throw new BadRequestError("Assigned user is not a project member");
    }
    //3.Create Task entity
    const task = new Task({
      projectId,
      assignedBy: managerId,
      assignedTo,
      title: title.trim(),
      description,
      status: "todo",
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const saved = await this.taskRepo.create(task);

    return this.mapToResponse(saved);
  }
  private mapToResponse(task: Task): TaskResponseDTO {
    return {
      id: task.id!,
      projectId: task.projectId,
      assignedTo: {
        id: task.assignedTo,
        name: "", // resolved via read model later
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
