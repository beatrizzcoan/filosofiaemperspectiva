import { AuthController } from "@/controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/register", AuthController.createUser);
router.post("/login", AuthController.login);
router.put("/change-password", AuthController.changePassword);

export default router;
