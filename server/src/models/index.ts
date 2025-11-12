import { Sequelize } from "sequelize";
import { User } from "./user.entity";

export function initModels(sequelize: Sequelize) {
  User.initModel(sequelize);

  return {
    User,
    Event,
  };
}

export { User } from "./user.entity";
