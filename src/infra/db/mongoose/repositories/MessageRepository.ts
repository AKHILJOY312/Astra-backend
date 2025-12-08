import { IMessageRepository } from "@/application/repositories/IMessageRepository";
import { Message } from "@/domain/entities/message/Message";
import { MessageModel, toMessageEntity } from "../models/MessageModel";

export class MessageRepository implements IMessageRepository {
  async create(msg: Message): Promise<Message> {
    const doc = await MessageModel.create({
      channelId: msg.channelId,
      senderId: msg.senderId,
      text: msg.text,
      senderName: msg.senderName,
      hasAttachments: msg.hasAttachments,
    });
    console.log("Created Message Document:", doc);
    return toMessageEntity(doc);
  }

  async listByChannel(channelId: string): Promise<Message[]> {
    const docs = await MessageModel.find({ channelId }).sort({ createdAt: 1 });
    return docs.map(toMessageEntity);
  }
}
