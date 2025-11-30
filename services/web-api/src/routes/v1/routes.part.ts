import { Router } from "express";
import { partController } from "@/controllers";

const router: Router = Router();

router.get("/", partController.getAllParts);
router.get("/:id", partController.getPartById);
router.get("exists/:id", partController.checkPartExists);

router.post("/", partController.createPart);

router.put("/properties", partController.updatePartProperties);

export default router;
