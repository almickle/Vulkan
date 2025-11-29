import { Router } from "express";
import users from "./users.routes.js";
import parts from "./parts.routes.js";

const router: Router = Router();

router.use("/users", users); // /api/v1/users/...
router.use("/parts", parts); // /api/v1/parts/...

export default router;
