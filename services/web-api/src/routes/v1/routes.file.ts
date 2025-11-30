import { Router } from "express";
import { fileController } from "@/controllers";

const router: Router = Router();

router.put("/:id", fileController.upload);
router.get("/:id", fileController.download);

export default router;
