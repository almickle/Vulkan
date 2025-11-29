import { Request, Response, NextFunction } from "express";
import * as partsRepo from "../repositories/parts.repo.js";

export async function getAllParts(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parts = await partsRepo.getAllParts();
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
    const part = await partsRepo.getPartById(id);

    if (!part) {
      res.status(404).json({ error: "Part not found" });
      return;
    }

    res.json(part);
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

    const part = await partsRepo.createPart({
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

    const updatedProperties = await partsRepo.updatePartProperties({
      properties
    });

    res.json(updatedProperties);
  } catch (err) {
    next(err);
  }
}
