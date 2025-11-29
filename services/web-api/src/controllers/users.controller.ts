import { Request, Response, NextFunction } from "express";
import * as userRepo from "../repositories/users.repo.js";

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await userRepo.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const user = await userRepo.getUserById(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, name } = req.body;

    // You can generate id here instead of passing it from the client:
    const user = await userRepo.createUser({
      id: crypto.randomUUID(), // or let Prisma default handle it and remove id from data
      email,
      name
    });

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { email, name } = req.body;

    const user = await userRepo.updateUser(id, { email, name });

    res.json(user);
  } catch (err) {
    next(err);
  }
}
