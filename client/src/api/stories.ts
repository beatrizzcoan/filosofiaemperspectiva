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

export const StoryService = {
  async getAll(): Promise<Story[]> {
    return apiClient.get<Story[]>("/stories");
  },

  async getById(id: string | number): Promise<Story> {
    return apiClient.get<Story>(`/stories/${id}`);
  },
};
