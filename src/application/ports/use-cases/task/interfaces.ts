import {
  CreateTaskRequestDTO,
  UpdateTaskRequestDTO,
  UpdateTaskStatusRequestDTO,
  TaskResponseDTO,
  PresignedUrlResponseDTO,
  SearchMembersRequestDTO,
  MemberSearchResponseDTO,
} from "@/application/dto/task/taskDto";

/* ─────────────────────────────
   Manager Use Cases
   ───────────────────────────── */

export interface ICreateTaskUseCase {
  execute(
    input: CreateTaskRequestDTO,
    managerId: string,
  ): Promise<TaskResponseDTO>;
}

export interface IUpdateTaskUseCase {
  execute(
    taskId: string,
    input: UpdateTaskRequestDTO,
    managerId: string,
  ): Promise<TaskResponseDTO>;
}

export interface IDeleteTaskUseCase {
  execute(taskId: string, managerId: string): Promise<void>;
}

export interface IGetProjectTasksUseCase {
  execute(projectId: string, requesterId: string): Promise<TaskResponseDTO[]>;
}

/* ─────────────────────────────
   Member Use Cases
   ───────────────────────────── */

export interface IGetMyTasksUseCase {
  execute(userId: string): Promise<TaskResponseDTO[]>;
}

export interface IUpdateTaskStatusUseCase {
  execute(
    taskId: string,
    input: UpdateTaskStatusRequestDTO,
    userId: string,
  ): Promise<TaskResponseDTO>;
}

/* ─────────────────────────────
   Attachments (S3)
   ───────────────────────────── */

export interface IGetAttachmentUploadUrlUseCase {
  execute(
    projectId: string,
    fileName: string,
    fileType: string,
    requesterId: string,
  ): Promise<PresignedUrlResponseDTO>;
}

/* ─────────────────────────────
   Search (Independent Use Case)
   ───────────────────────────── */

export interface ISearchProjectMembersUseCase {
  execute(
    input: SearchMembersRequestDTO,
    managerId: string,
  ): Promise<MemberSearchResponseDTO>;
}
