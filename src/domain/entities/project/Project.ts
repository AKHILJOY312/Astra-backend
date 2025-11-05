export interface Project {
  id: string;
  name: string;
  ownerId: string;
  channelIds: string[];
  taskBoardId: string;
  memberIds: string[];
  isPremium: boolean;
  createdAt: Date;
}
