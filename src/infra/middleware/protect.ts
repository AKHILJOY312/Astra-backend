import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../../application/repositories/IUserRepository";

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
      };
    }
  }
}

export const createProtectMiddleware = (userRepo: IUserRepository) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    console.log(
      "---------------------------------------------------------------------------------"
    );
    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      ) as JwtPayload;

      const user = await userRepo.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: "User no longer exists" });
      }

      req.user = {
        id: user.id!,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  };
};
