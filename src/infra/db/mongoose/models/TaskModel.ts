import {
  Task,
  TASK_PRIORITIES,
  TASK_STATUSES,
  TaskPriority,
  TaskProps,
  TaskStatus,
} from "@/domain/entities/task/Task";
import mongoose, { Document, Schema, Types } from "mongoose";

export interface TaskDoc extends Document {
  _id: Types.ObjectId;
  id: string;
  projectId: string;
  title: string;
  description?: string | null;
  assignedTo: string;
  assignedBy: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date | null;
  hasAttachments: boolean;
  isDeleted: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const taskScheme = new Schema<TaskDoc>(
  {
    id: { type: String, required: true, unique: true },
    projectId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: null },
    assignedTo: { type: String, required: true, index: true },
    priority: {
      type: String,
      enum: TASK_PRIORITIES,
      required: true,
    },
    status: {
      type: String,
      enum: TASK_STATUSES,
      required: true,
    },
    dueDate: { type: Date, default: null },
    hasAttachments: { type: Boolean, default: false },

    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export const TaskModel = mongoose.model<TaskDoc>("Task", taskScheme);

export const toTaskEntity = (doc: TaskDoc): Task => {
  const props: TaskProps = {
    id: doc.id,
    projectId: doc.projectId,
    title: doc.title,
    description: doc.description ?? null,
    assignedTo: doc.assignedTo,
    priority: doc.priority,
    status: doc.status,
    dueDate: doc.dueDate ?? null,
    hasAttachments: doc.hasAttachments,
    assignedBy: doc.assignedBy,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };

  return new Task(props);
};
