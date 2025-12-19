import { ListMessagesUseCase } from "@/application/use-cases/message/ListMessagesUseCase";
import { SendMessageUseCase } from "@/application/use-cases/message/SendMessageUseCase";
import { TYPES } from "@/config/types";
import { asyncHandler } from "@/infra/web/express/handler/asyncHandler";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class MessageController {
  constructor(
    @inject(TYPES.SendMessageUseCase) private sendMessageUC: SendMessageUseCase,
    @inject(TYPES.ListMessagesUseCase)
    private listMessagesUC: ListMessagesUseCase
  ) {}

  listMessagesPerChannel = asyncHandler(async (req: Request, res: Response) => {
    const channelId = req.params.channelId;
    const cursor = req.query.cursor as string | undefined;
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : undefined;

    const messages = await this.listMessagesUC.execute({
      channelId,
      cursor,
      limit,
    });
    return res
      .status(200)
      .json({ success: true, data: messages.map((msg) => msg.toJSON()) });
  });
  sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const channelId = req.params.channelId;
    const projectId = req.params.projectId;
    const senderId = req.user!.id;
    const { text, attachments } = req.body;

    const message = await this.sendMessageUC.execute({
      projectId,
      channelId,
      senderId,
      text,
      attachments,
    });
    return res.status(201).json({ success: true, data: message.toJSON() });
  });
}
