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
}
