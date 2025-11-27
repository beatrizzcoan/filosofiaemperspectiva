import { AuthController } from "@/controllers/auth.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { upload } from "@/middleware/multer.middleware";
import { Router } from "express";

const router = Router();

router.post("/register", AuthController.createUser);
router.post("/login", AuthController.login);
router.put("/change-password", AuthController.changePassword);

router.patch(
  "/me",
  authMiddleware,
  upload.single("profile_picture"),
  AuthController.updateProfile,
);
router.get("/me", authMiddleware, AuthController.getMe);

export default router;
