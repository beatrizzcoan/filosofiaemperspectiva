import { Story } from "@/models";
import { SavedStory } from "@/models/saved-story.entity";
import { FindOptions } from "sequelize";

export class SavedStoryRepository {
  static async findAll(options: FindOptions = {}): Promise<SavedStory[]> {
    return SavedStory.findAll(options);
  }

  static async saveStory(userID: number, storyID: number): Promise<SavedStory> {
    return SavedStory.create({ userID, storyID });
  }

  static async removeSavedStory(
    userID: number,
    storyID: number,
  ): Promise<number> {
    return SavedStory.destroy({ where: { userID, storyID } });
  }

  static async getSavedByUser(
    userID: number,
    options: FindOptions = {},
  ): Promise<Story[]> {
    const baseInclude = [{ model: Story, as: "story" }];
    const include = options.include
      ? ([] as any).concat(baseInclude, options.include)
      : baseInclude;
    const saved = await SavedStory.findAll({
      where: { userID },
      ...options,
      include,
    });
    return saved.map((s) => (s as any).story).filter(Boolean) as Story[];
  }

  static async isStorySavedByUser(
    userID: number,
    storyID: number,
  ): Promise<boolean> {
    const count = await SavedStory.count({ where: { userID, storyID } });
    return count > 0;
  }
}
