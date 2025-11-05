import { Message } from '../../domain/entities/message/Message';

export interface MessageRepository {
  save(entity: Message): Promise<void>;
  findById(id: string): Promise<Message | null>;
  // Add more as needed
}
