import { Router } from "express";
import * as partsController from "../../controllers/parts.controller.js";

const router: Router = Router();

router.get("/", partsController.getAllParts);
router.get("/:id", partsController.getPartById);

router.post("/", partsController.createPart);

router.put("/properties", partsController.updatePartProperties);

export default router;
