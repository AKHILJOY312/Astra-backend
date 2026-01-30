import { BadRequestError } from "@/application/error/AppError";

import { ITaskAttachmentRepository } from "@/application/ports/repositories/ITaskAttachmentRepository";
import { IFileUploadService } from "@/application/ports/services/IFileUploadService";
import { GetAttachmentDownloadUrlOutput } from "@/application/ports/use-cases/message/IGetAttachmentDownloadUrlUseCase";
import { IGetTaskAttachmentDownloadUrlUseCase } from "@/application/ports/use-cases/task/interfaces";
import { TYPES } from "@/config/di/types";
import { inject, injectable } from "inversify";

@injectable()
export class GetTaskAttachmentDownloadUrlUseCase implements IGetTaskAttachmentDownloadUrlUseCase {
  constructor(
    @inject(TYPES.TaskAttachmentRepository)
    private _attachmentRepo: ITaskAttachmentRepository,
    @inject(TYPES.FileUploadService) private _fileUploadSvc: IFileUploadService,
  ) {}

  async execute(attachmentId: string): Promise<GetAttachmentDownloadUrlOutput> {
    const attachment = await this._attachmentRepo.findById(attachmentId);
    if (!attachment) {
      throw new BadRequestError("Attachment not found");
    }

    const key = attachment.fileUrl.split(".amazonaws.com/")[1];
    if (!key) {
      throw new BadRequestError("Invalid attachment storage key");
    }

    return this._fileUploadSvc.generateChatFileAccessUrl({
      key,
      contentType: attachment.fileType,
    });
  }
}
