import type { Request, Response, NextFunction } from "express";
import { UserService } from "../services/auth.service";
import { ApiError } from "@/common/errors/ApiError";

export class AuthController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "Usuário, email e senha são obrigatórios" });
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

  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(Number(id));
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
}
