import { Router } from "express";
import { upload, download } from "./controller";

const router: Router = Router();

router.put("/:id", upload);
router.get("/:id", download);

export default router;
