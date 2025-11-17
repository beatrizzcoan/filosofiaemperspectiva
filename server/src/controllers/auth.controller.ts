import type { Request, Response, NextFunction } from "express";
import { UserService } from "../services/auth.service";
import { ApiError } from "@/common/errors/ApiError";

export class AuthController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Usuário, email e senha são obrigatórios" });
      }

      const user = await UserService.createUser(name, email, password);

      res.status(201).json(user);
    } catch (err: any) {
      if (err instanceof ApiError) {
        return res.status(err.getStatusCode()).json({ message: err.message });
      }
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email e senha são obrigatórios" });
      }

      const token = await UserService.login(email, password);

      res.json({ token });
    } catch (error) {
      if (error instanceof ApiError) {
        return res
          .status(error.getStatusCode())
          .json({ message: error.message });
      }

      next(error);
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res
          .status(400)
          .json({ message: "Senha antiga e nova são obrigatórias" });
      }

      await UserService.changePassword(email, oldPassword, newPassword);

      res.json({ message: "Senha alterada com sucesso" });
    } catch (error) {
      if (error instanceof ApiError) {
        return res
          .status(error.getStatusCode())
          .json({ message: error.message });
      }

      next(error);
    }
  }

  static async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new ApiError(401, "Acesso não autorizado");
      }

      const userId = req.user.id;
      const user = await UserService.getMe(userId);

      res.json(user);
    } catch (error) {
      if (error instanceof ApiError) {
        return res
          .status(error.getStatusCode())
          .json({ message: error.message });
      }
      next(error);
    }
  }
}
