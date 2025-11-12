import { User } from "../models";

type CreateUserDTO = {
  name: string;
  email: string;
};

export class UserService {
  static async createUser(data: CreateUserDTO) {
    const user = await User.create(data);
    return user;
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
