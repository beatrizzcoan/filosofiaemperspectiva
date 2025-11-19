import { Request, Response, NextFunction } from "express";
import { StoryService } from "@/services/story.service";
import { ApiError } from "@/common/errors/ApiError";

export class StoryController {
  static async getSavedStoriesByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userID } = req.params;

      if (isNaN(Number(userID))) {
        return res.status(400).json({ message: "ID do usuário inválido" });
      }

      const stories = await StoryService.getSavedStoriesByUser(Number(userID));
      res.json(stories);
    } catch (error) {
      next(error);
    }
  }

  static async saveStory(req: Request, res: Response, next: NextFunction) {
    try {
      const { userID, storyID } = req.body;

      if (isNaN(Number(userID)) || isNaN(Number(storyID))) {
        return res.status(400).json({ message: "IDs inválidos" });
      }

      const savedStory = await StoryService.saveStory(Number(userID), Number(storyID));
      res.status(201).json(savedStory);
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.getStatusCode()).json({ message: error.getMessage() });
      }

      next(error);
    }
  }

  static async removeSavedStory(req: Request, res: Response, next: NextFunction) {
    try {
      const { userID, storyID } = req.body;

      if (isNaN(Number(userID)) || isNaN(Number(storyID))) {
        return res.status(400).json({ message: "IDs inválidos" });
      }

      await StoryService.removeSavedStory(Number(userID), Number(storyID));
      res.status(204).send();
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.getStatusCode()).json({ message: error.getMessage() });
      }
      next(error);
    }
  }

  static async getAllStories(req: Request, res: Response, next: NextFunction) {
    try {
      const stories = await StoryService.getAllStories();
      res.json(stories);
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.getStatusCode()).json({ message: error.getMessage() });
      }
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
