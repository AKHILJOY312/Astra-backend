import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../../application/use-cases/auth/RegisterUserUseCase";
import { UserRepositoryImpl } from "../../../frameworks/db/repositories/UserRepositoryImpl";

export class AuthController {
  private registerUseCase: RegisterUserUseCase;

  constructor() {
    this.registerUseCase = new RegisterUserUseCase(new UserRepositoryImpl());
  }

  register = async (req: Request, res: Response) => {
    try {
      const user = await this.registerUseCase.execute(req.body);
      res.status(201).json({ userId: user.id, email: user.email });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}
