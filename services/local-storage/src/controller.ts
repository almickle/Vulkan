import { Request, Response, NextFunction } from "express";
import { fileManager } from "@/fileManager";

export async function upload(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const fileBuffer = req.body as Buffer;

    if (!Buffer.isBuffer(fileBuffer)) {
      return res.status(400).json({ error: "Expected binary file upload" });
    }

    await fileManager.save(id, fileBuffer);

    res.json({ message: `Uploaded file with id: ${id}` });
  } catch (err) {
    next(err);
  }
}

export async function download(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const fileBuffer = await fileManager.read(id);
    res.type("application/octet-stream").send(fileBuffer);
  } catch (err) {
    next(err);
  }
}
