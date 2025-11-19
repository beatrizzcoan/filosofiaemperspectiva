import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes, type Sequelize } from "sequelize";

export class SavedStory extends Model<InferAttributes<SavedStory>, InferCreationAttributes<SavedStory>> {
  declare id: CreationOptional<number>;
  declare storyID: CreationOptional<number>;
  declare userID: CreationOptional<number>;

  static initModel(sequelize: Sequelize) {
    SavedStory.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },
        storyID: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: "stories",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        userID: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      {
        sequelize,
        tableName: "saved_stories",
        modelName: "SavedStory",
        timestamps: true,
        underscored: false,
      },
    );
  }

  static associate(models: any) {
    SavedStory.belongsTo(models.Story, { foreignKey: "storyID", as: "story" });
    SavedStory.belongsTo(models.User, { foreignKey: "userID", as: "user" });
  }
}
