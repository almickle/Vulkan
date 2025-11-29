import { Router } from "express";
import * as usersController from "../../controllers/users.controller.js";

const router: Router = Router();

router.get("/", usersController.getAllUsers);
router.post("/", usersController.createUser);

router.get("/:id", usersController.getUserById);

export default router;
