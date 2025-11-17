import { StoryController } from "@/controllers/story.controller";
import { Router } from "express";

const router = Router();

router.get("/", StoryController.getAllStories);

export default router;
