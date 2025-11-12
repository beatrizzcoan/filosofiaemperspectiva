import { AuthController } from "@/controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/", AuthController.createUser);
router.get("/", AuthController.getAllUsers);
router.get("/:id", AuthController.getUserById);

export default router;
