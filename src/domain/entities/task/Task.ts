export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId?: string;
  dueDate?: Date;
  status: TaskStatus;
  projectId: string;
  commentIds: string[];
  attachmentUrls: string[];
}
