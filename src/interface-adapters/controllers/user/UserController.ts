import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "@/config/types";
import { GetUserProfileUseCase } from "@/application/use-cases/user/GetUserProfileUseCase";
import { UpdateUserProfileUseCase } from "@/application/use-cases/user/UpdateUserProfileUseCase";
import { DeleteUserAccountUseCase } from "@/application/use-cases/user/DeleteUserAccountUseCase";
import { asyncHandler } from "@/infra/web/express/handler/asyncHandler";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.GetUserProfileUseCase)
    private getProfileUC: GetUserProfileUseCase,
    @inject(TYPES.UpdateUserProfileUseCase)
    private updateProfileUC: UpdateUserProfileUseCase,
    @inject(TYPES.DeleteUserAccountUseCase)
    private deleteAccountUC: DeleteUserAccountUseCase
  ) {}

  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const data = await this.getProfileUC.execute(userId);
    res.status(200).json(data);
  });

  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { name, email } = req.body;

    const updated = await this.updateProfileUC.execute(userId, {
      name,
      email,
    });

    res.status(200).json(updated);
  });

  deleteAccount = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    await this.deleteAccountUC.execute(userId);
    res.status(204).send();
  });
}
