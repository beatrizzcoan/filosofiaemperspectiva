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
      const userData = req.app.get("userData");
      const userID = userData.id;

      if (!userID) throw new ApiError(401, "Acesso não autorizado");

      const user = await UserService.getMe(userID);

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

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.app.get("userData");
      const userID = userData.id;

      if (!userID) throw new ApiError(401, "Acesso não autorizado");

      const { name } = req.body;
      let avatarUrl;

      if (req.file) {
        avatarUrl = `uploads/${req.file.filename}`;
      } else if (req.body.avatarUrl === "") {
        avatarUrl = null;
      }

      const updatedUser = await UserService.updateProfile(userID, {
        name,
        avatarUrl,
      });
      res.json(updatedUser);
    } catch (error) {
      if (error instanceof ApiError)
        return res
          .status(error.getStatusCode())
          .json({ message: error.message });
      next(error);
    }
  }
}
