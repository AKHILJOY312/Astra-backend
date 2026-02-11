export const TASK_STATUSES = ["todo", "inprogress", "done"] as const;
export const TASK_PRIORITIES = ["low", "medium", "high", "critical"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export interface TaskProps {
  id?: string;
  projectId: string;
  assignedBy: string;
  assignedTo: string;
  title: string;
  description?: string | null;
  hasAttachments?: boolean;
  status: TaskStatus;
  dueDate?: Date | null;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
}

export class Task {
  private _props: TaskProps;

  constructor(
    props: Partial<TaskProps> & { title: string; projectId: string },
  ) {
    this._props = {
      ...props,
      title: props.title.trim(),
      status: props.status ?? "todo",
      priority: props.priority ?? "medium",
      createdAt: props.createdAt ?? new Date(),
      updatedAt: new Date(),
    } as TaskProps;
    if (this._props.title.length === 0) {
      throw new Error("Task title cannot be empty");
    }
  }

  private ensureTaskIsEditable(): void {
    if (this._props.status === "done") {
      throw new Error("Cannot modify a completed task.");
    }
  }

  private markAsUpdated(): void {
    this._props.updatedAt = new Date();
  }

  //getters
  get id(): string | undefined {
    return this._props.id;
  }
  get projectId(): string {
    return this._props.projectId;
  }
  get assignedBy(): string {
    return this._props.assignedBy;
  }
  get assignedTo(): string {
    return this._props.assignedTo;
  }
  get title(): string {
    return this._props.title;
  }
  get description(): string | null | undefined {
    return this._props.description;
  }
  get hasAttachments(): boolean | undefined {
    return this._props.hasAttachments;
  }
  get status(): TaskStatus {
    return this._props.status;
  }
  get dueDate(): Date | null | undefined {
    return this._props.dueDate;
  }
  get priority(): TaskPriority {
    return this._props.priority;
  }
  get createdAt(): Date {
    return this._props.createdAt;
  }
  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  //Internal mutators
  setId(id: string): void {
    this._props.id = id;
  }
  setUpdatedAt(date: Date): void {
    this._props.updatedAt = date;
  }
  //Business Methods
  assignTo(userId: string): void {
    this._props.assignedTo = userId;
  }
  changeStatus(status: TaskStatus): void {
    if (this._props.status === "todo" && status === "done") {
      throw new Error(
        "Cannot jump from Todo to Done. Task must be 'inprogress' first.",
      );
    }
    this._props.status = status;
    this._props.updatedAt = new Date();
  }
  changePriority(priority: TaskPriority) {
    this.ensureTaskIsEditable();
    this._props.priority = priority;
    this.markAsUpdated();
  }
  updateTitle(title: string) {
    this.ensureTaskIsEditable();
    this._props.title = title.trim();
    this.markAsUpdated();
  }
  updateDescription(description: string | null): void {
    this._props.description = description;
  }
  setDueDate(dueDate: Date | null): void {
    this.ensureTaskIsEditable();
    // Rule: Due date cannot be in the past for active tasks
    if (dueDate && dueDate < new Date() && this._props.status !== "done") {
      throw new Error("Due date cannot be in the past.");
    }
    this._props.dueDate = dueDate;
    this.markAsUpdated();
  }
}
