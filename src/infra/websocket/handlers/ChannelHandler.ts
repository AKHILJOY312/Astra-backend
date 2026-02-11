// src/infra/web/socket/handlers/ChannelHandler.ts
import { BaseSocketHandler } from "./BaseSocketHandler";

export class ChannelHandler extends BaseSocketHandler {
  handle(): void {
    this.socket.on("channel:join", (channelId: string) => {
      if (channelId) {
        this.socket.join(channelId);
      }
    });

    this.socket.on("channel:leave", (channelId: string) => {
      if (channelId) {
        this.socket.leave(channelId);
      }
    });
  }
}
