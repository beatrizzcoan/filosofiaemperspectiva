import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type Sequelize,
  type HasManyGetAssociationsMixin,
  type HasManyAddAssociationMixin,
} from "sequelize";
import type { Bookmark } from "./bookmark.entity";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;

  declare getBookmarks: HasManyGetAssociationsMixin<Bookmark>;
  declare addBookmark: HasManyAddAssociationMixin<Bookmark, number>;

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
          unique: true,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "users",
        modelName: "User",
        timestamps: true,
        underscored: false,
      },
    );
  }
}
