import { Sequelize } from "sequelize";
import { User } from "./user.entity";
import { Story } from "./story.entity";
import { SavedStory } from "./saved-story.entity";

export { User, Story, SavedStory };

export function initModels(sequelize: Sequelize) {
  User.initModel(sequelize);
  Story.initModel(sequelize);

  SavedStory.initModel(sequelize);
  SavedStory.associate({ Story, User });

  User.hasMany(SavedStory, { foreignKey: "userId" });
  SavedStory.belongsTo(User, { foreignKey: "userId" });

  Story.hasMany(SavedStory, { foreignKey: "storyId" });
  SavedStory.belongsTo(Story, { foreignKey: "storyId" });

  return {
    User,
    Story,
  };
}
