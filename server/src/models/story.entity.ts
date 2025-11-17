import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  type Sequelize,
  type HasManyAddAssociationMixin,
  type HasManyGetAssociationsMixin,
} from "sequelize";
import type { Bookmark } from "./bookmark.entity";

export class Story extends Model<
  InferAttributes<Story>,
  InferCreationAttributes<Story>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare tag: string;
  declare content: string;
  declare imageUrl: string;
  declare tagColor: string;

  declare getBookmarks: HasManyGetAssociationsMixin<Bookmark>;
  declare addBookmark: HasManyAddAssociationMixin<Bookmark, number>;

  static initModel(sequelize: Sequelize) {
    Story.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        tag: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        tagColor: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        imageUrl: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "stories",
        modelName: "Story",
        timestamps: true,
        underscored: false,
      },
    );
  }
}
