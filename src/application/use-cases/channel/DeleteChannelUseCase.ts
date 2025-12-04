// src/core/use-cases/channel/DeleteChannelUseCase.ts

import { IChannelRepository } from "../../repositories/IChannelRepository";
import { IProjectMembershipRepository } from "../../repositories/IProjectMembershipRepository";

export class DeleteChannelUseCase {
  constructor(
    private channelRepo: IChannelRepository,
    private membershipRepo: IProjectMembershipRepository
  ) {}

  async execute(channelId: string, userId: string) {
    const channel = await this.channelRepo.findById(channelId);
    if (!channel) throw new Error("Channel not found");

    const membership = await this.membershipRepo.findByProjectAndUser(
      channel.projectId,
      userId
    );

    if (!membership || membership.role !== "manager") {
      throw new Error("Only project admins can delete channels");
    }

    return await this.channelRepo.delete(channelId);
  }
}
