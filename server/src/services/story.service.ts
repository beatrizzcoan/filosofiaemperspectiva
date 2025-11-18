import { ApiError } from "@/common/errors/ApiError";
import { StoryRepository } from "@/repository/story.repository";

export class StoryService {
  static async getAllStories() {
    return StoryRepository.findAll({ order: [["createdAt", "DESC"]] });
  }
  static async getStoryById(id: number) {
    const story = await StoryRepository.findById(id);
    if (!story) {
      throw new ApiError(404, "História não encontrada");
    }
    return story;
  }
}
