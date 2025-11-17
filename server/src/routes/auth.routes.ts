import { AuthController } from "@/controllers/auth.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

const router = Router();

router.post("/register", AuthController.createUser);
router.post("/login", AuthController.login);
router.put("/change-password", AuthController.changePassword);

router.get("/me", authMiddleware, AuthController.getMe);

export default router;
