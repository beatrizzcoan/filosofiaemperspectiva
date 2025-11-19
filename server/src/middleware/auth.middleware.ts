import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/server";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      message: "Acesso negado. Nenhum token fornecido.",
    });
    return;
  }

  if (!authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Formato de token inválido. Use 'Bearer <token>'.",
    });
    return;
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      email: string;
      name: string;
    };

    req.app.set("userData", decoded);

    next();
  } catch (error) {
    res.status(401).json({
      message: "Token inválido ou expirado.",
    });
    return;
  }
};
