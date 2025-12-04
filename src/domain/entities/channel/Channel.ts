// src/core/entities/Channel.ts
export interface ChannelProps {
  id?: string;
  projectId: string;
  channelName: string;
  description?: string;
  createdBy: string;
  visibleToRoles: string[];
  permissionsByRole: Record<string, "view" | "message" | "manager">;
  lastMessage?: string;
  unreadCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Channel {
  private _props: ChannelProps;

  constructor(props: ChannelProps) {
    this._props = {
      ...props,
      description: props.description || "",
      visibleToRoles: props.visibleToRoles || [],
      permissionsByRole: props.permissionsByRole || {},
    };
  }

  // ======= GETTERS =======
  get id() {
    return this._props.id;
  }
  get projectId() {
    return this._props.projectId;
  }
  get channelName() {
    return this._props.channelName;
  }
  get description() {
    return this._props.description;
  }
  get createdBy() {
    return this._props.createdBy;
  }

  get createdAt() {
    return this._props.createdAt;
  }
  get updatedAt() {
    return this._props.updatedAt;
  }
  get visibleToRoles() {
    return this._props.visibleToRoles;
  }

  get permissionsByRole() {
    return this._props.permissionsByRole;
  }
  // ======= ACTIONS =======
  rename(name: string) {
    if (!name.trim()) throw new Error("Channel name cannot be empty");
    this._props.channelName = name.trim();
  }

  updateDescription(description?: string) {
    this._props.description = description?.trim() || "";
  }
  updateVisibility(roles: string[]) {
    if (!roles.length)
      throw new Error("Channel must be visible to at least one role");
    this._props.visibleToRoles = roles;
  }

  updatePermissions(map: Record<string, "view" | "message" | "manager">) {
    this._props.permissionsByRole = map;
  }
  // ======= SETTERS =======
  setId(id: string) {
    this._props.id = id;
  }

  setCreatedAt(date: Date) {
    this._props.createdAt = date;
  }

  setUpdatedAt(date: Date) {
    this._props.updatedAt = date;
  }

  public toJSON() {
    return { ...this._props };
  }
}
