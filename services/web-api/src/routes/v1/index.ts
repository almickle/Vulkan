import { Router } from "express";
import users from "./users.routes.js";

const router: Router = Router();

router.use("/users", users); // /api/v1/users/...

export default router;
