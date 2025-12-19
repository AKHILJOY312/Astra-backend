// src/infra/web/socket/handlers/ChannelHandler.ts
import { BaseSocketHandler } from "./BaseSocketHandler";

export class ChannelHandler extends BaseSocketHandler {
  handle(): void {
    this.socket.on("channel:join", (channelId: string) => {
      if (channelId) {
        this.socket.join(channelId);
        console.log(
          `User ${this.socket.data.user.id} joined channel ${channelId}`
        );
      }
    });

    this.socket.on("channel:leave", (channelId: string) => {
      if (channelId) {
        this.socket.leave(channelId);
        console.log(
          `User ${this.socket.data.user.id} left channel ${channelId}`
        );
      }
    });
  }
}
