import { ContainerModule } from "inversify";
import { TYPES } from "../types";

import { IUserRepository } from "@/application/ports/repositories/IUserRepository";
import { ITokenBlacklistService } from "@/application/ports/services/ITokenBlacklistService";

import { createProtectMiddleware } from "@/infra/web/express/middleware/protect";

export const middlewareModule = new ContainerModule((options) => {
  /**
   * Protect Middleware
   *
   * This is a factory that creates the Express protect middleware.
   * It depends on UserRepository and TokenBlacklistService, which are already
   * registered as singletons in coreModule.
   *
   * In InversifyJS v7, we use context.get() inside toDynamicValue to resolve
   * dependencies safely during the current resolution plan.
   */
  options
    .bind(TYPES.ProtectMiddleware)
    .toDynamicValue((context) => {
      const userRepo = context.get<IUserRepository>(TYPES.UserRepository);
      const blacklistService = context.get<ITokenBlacklistService>(
        TYPES.TokenBlacklistService
      );

      return createProtectMiddleware(userRepo, blacklistService);
    })
    .inSingletonScope();
});
