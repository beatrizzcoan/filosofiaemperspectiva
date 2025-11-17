import { Story } from "@/models/story.entity";
import { FindOptions } from "sequelize";

export class StoryRepository {
  static async findAll(options: FindOptions = {}): Promise<Story[]> {
    return Story.findAll(options);
  }

  static async findById(id: number): Promise<Story | null> {
    return Story.findByPk(id);
  }
}
