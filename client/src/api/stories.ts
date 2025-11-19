import { apiClient } from "./client";

export interface Story {
  id: number;
  title: string;
  tag: string;
  tagColor: string;
  content: string;
  imageUrl: string;
  createdAt?: string;
}

export interface SavedStory {
  userID: number;
  storyID: number;
}

export const StoryService = {
  async getAll(): Promise<Story[]> {
    return apiClient.get<Story[]>("/stories");
  },

  async getById(id: string | number): Promise<Story> {
    return apiClient.get<Story>(`/stories/${id}`);
  },

  async saveStory(userID: number, storyID: number): Promise<SavedStory> {
    return apiClient.post<SavedStory>("/stories/favs", { userID, storyID });
  },

  async getSavedStories(userID: number): Promise<Story[]> {
    return apiClient.get<Story[]>(`/stories/favs/${userID}`);
  },

  async removeSavedStory(userID: number, storyID: number): Promise<void> {
    return apiClient.delete<void>("/stories/favs", { userID, storyID });
  },
};
