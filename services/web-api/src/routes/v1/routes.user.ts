import { Router } from "express";
import { userController } from "@/controllers";

const router: Router = Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

router.get("/:id", userController.getUserById);

export default router;
