import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type Sequelize,
  type ForeignKey,
  type BelongsToGetAssociationMixin,
} from "sequelize";
import type { User } from "./user.entity";
import type { Story } from "./story.entity";

export class Bookmark extends Model<
  InferAttributes<Bookmark>,
  InferCreationAttributes<Bookmark>
> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User["id"]>;
  declare storyId: ForeignKey<Story["id"]>;

  declare getUser: BelongsToGetAssociationMixin<User>;
  declare getStory: BelongsToGetAssociationMixin<Story>;

  static initModel(sequelize: Sequelize) {
    Bookmark.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        storyId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: "stories",
            key: "id",
          },
        },
      },
      {
        sequelize,
        tableName: "bookmarks",
        modelName: "Bookmark",
        timestamps: true,
        underscored: false,
        indexes: [
          {
            unique: true,
            fields: ["userId", "storyId"],
          },
        ],
      },
    );
  }
}
