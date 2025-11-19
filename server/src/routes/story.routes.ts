import { StoryController } from "@/controllers/story.controller";
import { Router } from "express";

const router = Router();

router.get("/", StoryController.getAllStories);
router.get("/:id", StoryController.getStoryById);

router.get("/favs/:userID", StoryController.getSavedStoriesByUser);
router.post("/favs", StoryController.saveStory);
router.delete("/favs", StoryController.removeSavedStory);

export default router;
