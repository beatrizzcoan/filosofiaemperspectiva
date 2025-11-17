import { Sequelize } from "sequelize";
import { User } from "./user.entity";
import { Story } from "./story.entity";
import { Bookmark } from "./bookmark.entity";

export function initModels(sequelize: Sequelize) {
  User.initModel(sequelize);
  Story.initModel(sequelize);
  Bookmark.initModel(sequelize);

  User.hasMany(Bookmark, { foreignKey: "userId" });
  Bookmark.belongsTo(User, { foreignKey: "userId" });

  Story.hasMany(Bookmark, { foreignKey: "storyId" });
  Bookmark.belongsTo(Story, { foreignKey: "storyId" });

  return {
    User,
    Story,
    Bookmark,
  };
}

export default { Story, User, Bookmark };
