// src/core/use-cases/channel/ListChannelsForUserUseCase.ts

import { IChannelRepository } from "../../repositories/IChannelRepository";
import { IProjectMembershipRepository } from "../../repositories/IProjectMembershipRepository";

export class ListChannelsForUserUseCase {
  constructor(
    private channelRepo: IChannelRepository,
    private membershipRepo: IProjectMembershipRepository
  ) {}

  async execute(projectId: string, userId: string) {
    const membership = await this.membershipRepo.findByProjectAndUser(
      projectId,
      userId
    );
    if (!membership) throw new Error("You are not a project member");

    const userRole = membership.role;

    const channels = await this.channelRepo.findByProjectId(projectId);
    console.log("channels: ", channels);
    // Filter by visibility
    return channels.filter((c) => c.visibleToRoles.includes(userRole));
  }
}
