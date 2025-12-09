// src/presentation/controllers/AdminUserController.ts
import { Request, Response } from "express";
import { ListUsersUseCase } from "../../../application/use-cases/user/ListUserUseCase";
import { BlockUserUseCase } from "../../../application/use-cases/user/BlockUserUseCase";
import { AssignAdminRoleUseCase } from "../../../application/use-cases/user/AssingAdminRoleUseCase";

export class AdminUserController {
  constructor(
    private listUsersUseCase: ListUsersUseCase,
    private blockUserUseCase: BlockUserUseCase,
    private assignAdminRoleUseCase: AssignAdminRoleUseCase
  ) {}

  async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = Math.min(parseInt(req.query.limit as string) || 10, 30);
      const search = req.query.search as string | undefined;
      console.log("AdminUserController: listUsers called with", {
        page,
        limit,
        search,
      });
      const result = await this.listUsersUseCase.execute({
        page,
        limit,
        search,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  }

  async blockUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      console.log("this is working ");
      const user = await this.blockUserUseCase.execute(id);
      console.log("working after the blocking");
      res.status(200).json({ message: `User status updated `, user });
    } catch (error) {
      // Check for "User not found" error type
      res.status(404).json({ message: "User not found" });
    }
  }

  async updateRole(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const user = await this.assignAdminRoleUseCase.execute(id);

      res.status(200).json({ message: `User role updated`, user });
    } catch (error) {
      // Check for "User not found" error type
      res.status(404).json({ message: "User not found" });
    }
  }
}
