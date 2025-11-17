import { StoryRepository } from "@/repository/story.repository";

export class StoryService {
  static async getAllStories() {
    return StoryRepository.findAll({ order: [["createdAt", "DESC"]] });
  }
}
