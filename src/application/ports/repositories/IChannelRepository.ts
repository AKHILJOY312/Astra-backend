// src/core/repositories/IChannelRepository.ts
import { Channel } from "../../../domain/entities/channel/Channel";
import { IBaseRepository } from "./IBaseRepository";

export interface IChannelRepository extends IBaseRepository<Channel> {
  // create(channel: Channel): Promise<Channel>;
  // update(channel: Channel): Promise<Channel>;
  // delete(id: string): Promise<Channel | null>;
  // findById(id: string): Promise<Channel | null>;

  findByProjectId(projectId: string): Promise<Channel[]>;
  findByProjectAndName(
    projectId: string,
    channelName: string
  ): Promise<Channel | null>;

  countByProjectId(projectId: string): Promise<number>;
}
