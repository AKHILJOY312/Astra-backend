export interface Channel {
  id: string;
  name: string;
  projectId: string;
  memberIds: string[];
  messageIds: string[];
  createdAt: Date;
}
