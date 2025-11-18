import { Request, Response, NextFunction } from "express";
import { StoryService } from "@/services/story.service";

export class StoryController {
  static async getAllStories(req: Request, res: Response, next: NextFunction) {
    try {
      const stories = await StoryService.getAllStories();
      res.json(stories);
    } catch (error) {
      next(error);
    }
  }

  static async getStoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const story = await StoryService.getStoryById(Number(id));
      res.json(story);
    } catch (error) {
      next(error);
    }
  }
}
