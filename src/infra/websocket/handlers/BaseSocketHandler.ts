// src/infra/web/socket/handlers/BaseSocketHandler.ts
import { Socket } from "socket.io";
import { JwtPayload } from "../types/type";

export interface AuthenticatedSocket extends Socket {
  data: {
    user: JwtPayload;
  };
}

export abstract class BaseSocketHandler {
  protected socket: AuthenticatedSocket;

  constructor(socket: AuthenticatedSocket) {
    this.socket = socket;
  }

  abstract handle(): void;
}
