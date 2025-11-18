import { ApiError } from "@/common/errors/ApiError";
import { User } from "@/models";
import { Transaction, FindOptions, CreationAttributes } from "sequelize";

export class AuthRepository {
  static async create(
    data: CreationAttributes<User>,
    transaction?: Transaction,
  ): Promise<User> {
    const existing = await AuthRepository.findByEmail(data.email, transaction);

    if (existing) {
      throw new ApiError(409, "O Email inserido já está em uso");
    }

    return User.create(data, { transaction });
  }

  static async findById(id: number | string): Promise<User | null> {
    return User.findByPk(id);
  }

  static async findByEmail(
    email: string,
    transaction?: Transaction,
  ): Promise<User | null> {
    return User.findOne({ where: { email }, transaction });
  }

  static async list(
    where: Record<string, any> = {},
    options: FindOptions = {},
  ): Promise<any[]> {
    return User.findAll({ where, ...options });
  }

  static async update(id: number, data: Partial<User>): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new ApiError(404, "Usuário não encontrado");
    }
    return user.update(data);
  }
}

export default new AuthRepository();
