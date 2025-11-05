export type MessageType = 'text' | 'file' | 'voice' | 'call';

export interface Message {
  id: string;
  channelId: string;
  senderId: string;
  content: string;
  type: MessageType;
  fileUrl?: string;
  timestamp: Date;
  isDeleted: boolean;
}
