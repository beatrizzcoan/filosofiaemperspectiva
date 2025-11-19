import { ApiError } from "@/common/errors/ApiError";
import authRepository, { AuthRepository } from "@/repository/auth.repository";
import { SavedStoryRepository } from "@/repository/saved-story.repository";
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

  static async getSavedStoriesByUser(userID: number) {
    return SavedStoryRepository.getSavedByUser(userID);
  }

  static async saveStory(userID: number, storyID: number) {
    const existUserID = await AuthRepository.findById(userID);
    if (!existUserID) {
      throw new ApiError(404, "Usuário não encontrado");
    }

    const existStoryID = await StoryRepository.findById(storyID);
    if (!existStoryID) {
      throw new ApiError(404, "História não encontrada");
    }

    if (await SavedStoryRepository.isStorySavedByUser(userID, storyID)) {
      throw new ApiError(409, "História já salva por este usuário");
    }

    return SavedStoryRepository.saveStory(userID, storyID);
  }

  static async removeSavedStory(userID: number, storyID: number) {
    const exists = await SavedStoryRepository.isStorySavedByUser(userID, storyID);
    if (!exists) {
      throw new ApiError(404, "História salva não encontrada para este usuário");
    }

    return SavedStoryRepository.removeSavedStory(userID, storyID);
  }
}
