import { AuthController } from "@/controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/register", AuthController.createUser);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.login);
router.put("/change-password", AuthController.login);

router.get("/:id", AuthController.getUserById);

export default router;
