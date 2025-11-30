import { Router } from "express";
import users from "./routes.user";
import parts from "./routes.part";
import files from "./routes.file";

const router: Router = Router();

router.use("/users", users); // /api/v1/users/...
router.use("/parts", parts); // /api/v1/parts/...
router.use("/files", files); // /api/v1/files/...

export default router;
