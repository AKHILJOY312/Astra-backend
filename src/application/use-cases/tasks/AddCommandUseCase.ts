import { inject, injectable } from "inversify";
import { TYPES } from "@/config/di/types";
import { ICommentRepository } from "@/application/ports/repositories/ICommentRepository";
import { IProjectMembershipRepository } from "@/application/ports/repositories/IProjectMembershipRepository";
import { IUserRepository } from "@/application/ports/repositories/IUserRepository";
import { ITaskRepository } from "@/application/ports/repositories/ITaskRepository";

import { UnauthorizedError, NotFoundError } from "@/application/error/AppError";
import { Comment } from "@/domain/entities/task/Comment";
import {
  AddCommentRequestDTO,
  CommentResponseDTO,
} from "@/application/dto/task/commentDto";
import { IAddCommentUseCase } from "@/application/ports/use-cases/task/interfaces";

@injectable()
export class AddCommentUseCase implements IAddCommentUseCase {
  constructor(
    @inject(TYPES.CommentRepository) private _commentRepo: ICommentRepository,
    @inject(TYPES.TaskRepository) private _taskRepo: ITaskRepository,
    @inject(TYPES.ProjectMembershipRepository)
    private _membershipRepo: IProjectMembershipRepository,
    @inject(TYPES.UserRepository) private _userRepo: IUserRepository,
  ) {}

  async execute(
    input: AddCommentRequestDTO,
    userId: string,
  ): Promise<CommentResponseDTO> {
    const { taskId, projectId, message } = input;

    // 1. Verify Task exists
    const task = await this._taskRepo.findById(taskId);
    if (!task) {
      throw new NotFoundError("Task not found");
    }

    // 2. Permission Check: User must be a member of the project to comment/comment
    const membership = await this._membershipRepo.findByProjectAndUser(
      projectId,
      userId,
    );

    if (!membership) {
      throw new UnauthorizedError(
        "You must be a project member to add captions",
      );
    }

    // 3. Create Comment Entity
    const comment = new Comment({
      taskId,
      projectId,
      authorId: userId,
      message,
    });

    // 4. Persist to Repository
    const savedComment = await this._commentRepo.create(comment);

    // 5. Return mapped response
    return this.mapToResponse(savedComment);
  }

  private async mapToResponse(comment: Comment): Promise<CommentResponseDTO> {
    const author = await this._userRepo.findById(comment.authorId);

    return {
      id: comment.id!,
      taskId: comment.taskId,
      projectId: comment.projectId,
      author: {
        id: comment.authorId,
        name: author?.name || "Unknown User",
        email: author?.email,
        avatarUrl: author?.ImageUrl,
      },
      message: comment.message,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
    };
  }
}
