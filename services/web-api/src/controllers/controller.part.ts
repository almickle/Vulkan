import { Request, Response, NextFunction } from "express";
import { partRepo } from "../repositories";

export async function getAllParts(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parts = await partRepo.getAllParts();
    res.json(parts);
  } catch (err) {
    next(err);
  }
}

export async function getPartById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const part = await partRepo.getPartById(id);

    if (!part) {
      res.status(404).json({ error: "Part not found" });
      return;
    }

    res.json(part);
  } catch (err) {
    next(err);
  }
}

export async function checkPartExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const exists = (await partRepo.getPartCount(id)) > 0;
    res.json(exists);
  } catch (err) {
    next(err);
  }
}

export async function createPart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name } = req.body;

    const part = await partRepo.createPart({
      id: crypto.randomUUID(),
      name
    });

    res.status(201).json(part);
  } catch (err) {
    next(err);
  }
}

export async function updatePartProperties(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const properties = req.body;

    const updatedProperties = await partRepo.updatePartProperties({
      properties
    });

    res.json(updatedProperties);
  } catch (err) {
    next(err);
  }
}
