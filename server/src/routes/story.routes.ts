import { StoryController } from "@/controllers/story.controller";
import { Router } from "express";

const router = Router();

router.get("/", StoryController.getAllStories);
router.get("/:id", StoryController.getStoryById);

export default router;
