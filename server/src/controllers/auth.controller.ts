import type { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";

export class AuthController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        return res.status(400).json({ message: "name and email are required" });
      }
      const user = await UserService.createUser({ name, email });
      res.status(201).json(user);
    } catch (err: any) {
      if (err?.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "email already in use" });
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
