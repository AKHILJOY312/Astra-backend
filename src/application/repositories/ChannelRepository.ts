import { Channel } from '../../domain/entities/channel/Channel';

export interface ChannelRepository {
  save(entity: Channel): Promise<void>;
  findById(id: string): Promise<Channel | null>;
  // Add more as needed
}
