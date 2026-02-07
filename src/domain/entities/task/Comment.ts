export interface CommentProps {
  id?: string; // Optional for new commands before they hit the DB
  taskId: string;
  projectId: string;
  authorId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Comment {
  private _props: CommentProps;

  constructor(
    props: Omit<CommentProps, "createdAt" | "updatedAt"> & {
      createdAt?: Date;
      updatedAt?: Date;
    },
  ) {
    const trimmedMessage = props.message.trim();

    if (!trimmedMessage) {
      throw new Error("Comment message cannot be empty");
    }

    this._props = {
      ...props,
      message: trimmedMessage,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  // --- Getters ---
  get id(): string | undefined {
    return this._props.id;
  }

  get taskId(): string {
    return this._props.taskId;
  }

  get projectId(): string {
    return this._props.projectId;
  }

  get authorId(): string {
    return this._props.authorId;
  }

  get message(): string {
    return this._props.message;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  // --- Internal Mutators ---
  setId(id: string): void {
    this._props.id = id;
  }

  private setUpdatedAt(date: Date): void {
    this._props.updatedAt = date;
  }

  // --- Business Methods ---

  /**
   * Updates the command message and automatically refreshes the updatedAt timestamp.
   */
  editMessage(newMessage: string): void {
    const trimmed = newMessage.trim();
    if (!trimmed) throw new Error("Message cannot be empty");

    this._props.message = trimmed;
    this._props.updatedAt = new Date();
  }

  /**
   * Validates if the user attempting an action is the original author.
   */
  isAuthor(userId: string): boolean {
    return this._props.authorId === userId;
  }
}
