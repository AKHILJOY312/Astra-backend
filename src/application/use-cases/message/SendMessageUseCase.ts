import { Message, MessageType } from "../../../domain/entities/message/Message";
import { MessageRepository } from "../../repositories/MessageRepository";

export class SendMessageUseCase {
  constructor(private messageRepo: MessageRepository) {}

  async execute(data: {
    channelId: string;
    senderId: string;
    content: string;
    type: MessageType;
    fileUrl?: string;
  }): Promise<Message> {
    // Business rules: validate content, rate limiting, etc.
    if (!data.content && !data.fileUrl) {
      throw new Error("Message content or file is required");
    }

    const message: Message = {
      id: crypto.randomUUID(),
      channelId: data.channelId,
      senderId: data.senderId,
      content: data.content,
      type: data.type,
      fileUrl: data.fileUrl,
      timestamp: new Date(),
      isDeleted: false,
    };

    await this.messageRepo.save(message);
    return message;
  }
}
