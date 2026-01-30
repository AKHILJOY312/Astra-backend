import { inject, injectable } from "inversify";
import { TYPES } from "@/config/di/types";

import { UnauthorizedError, NotFoundError } from "@/application/error/AppError";
import { IDeleteTaskUseCase } from "@/application/ports/use-cases/task/interfaces";
import { ITaskRepository } from "@/application/ports/repositories/ITaskRepository";
import { IProjectMembershipRepository } from "@/application/ports/repositories/IProjectMembershipRepository";

@injectable()
export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(
    @inject(TYPES.TaskRepository)
    private _taskRepo: ITaskRepository,

    @inject(TYPES.ProjectMembershipRepository)
    private _membershipRepo: IProjectMembershipRepository,
  ) {}

  async execute(taskId: string, managerId: string): Promise<void> {
    // 1. Load task
    const task = await this._taskRepo.findById(taskId);
    if (!task) throw new NotFoundError("Task not found");

    // 2. Manager authorization
    const membership = await this._membershipRepo.findByProjectAndUser(
      task.projectId,
      managerId,
    );

    if (!membership || membership.role !== "manager") {
      throw new UnauthorizedError("Only managers can delete tasks");
    }

    // 3. Soft delete
    await this._taskRepo.softDelete(taskId);
  }
}
