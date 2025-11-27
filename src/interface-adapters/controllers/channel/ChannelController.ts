// src/interfaces/http/controllers/channel/ChannelController.ts
import { Request, Response } from "express";
import { CreateChannelUseCase } from "../../../application/use-cases/channel/CreateChannelUseCase";
import { z } from "zod";
import { HTTP_STATUS } from "../../http/constants/httpStatus";

export class ChannelController {
  constructor(private createChannelUseCase: CreateChannelUseCase) {}

  async createChannel(req: Request, res: Response) {
    const schema = z.object({
      projectId: z.string(),
      channelName: z.string().min(1).max(50),
      description: z.string().optional(),
      isPrivate: z.boolean().optional(),
    });

    const result = schema.safeParse(req.body);
    if (!result.success)
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: result.error.format() });

    const { projectId, channelName, description, isPrivate } = result.data;
    const createdBy = req.user!.id;

    try {
      const { channel } = await this.createChannelUseCase.execute({
        projectId,
        channelName,
        description,
        isPrivate,
        createdBy,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        success: true,
        data: channel.toJSON(),
      });
    } catch (err: any) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
    }
  }
}
