import bcrypt from "bcryptjs";
import { User } from "../models";
import { ApiError } from "@/common/errors/ApiError";
import { AuthRepository } from "@/repository/auth.repository";

export class UserService {
  static async createUser(name: string, email: string, password: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      throw new ApiError(400, "Email inválido");
    }

    if (!name || name.length < 3) {
      throw new ApiError(400, "Nome deve ter pelo menos 3 caracteres");
    }

    if (!password || password.length < 6) {
      throw new ApiError(400, "Senha deve ter pelo menos 6 caracteres");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const user = await AuthRepository.create(userData);

    const { password: _, ...userWithoutPassword } = user.toJSON();

    return userWithoutPassword;
  }

  static async getAllUsers() {
    const users = await User.findAll({ order: [["id", "ASC"]] });
    return users;
  }

  static async getUserById(id: number) {
    const user = await User.findByPk(id);
    return user;
  }
}
