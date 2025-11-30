import { Request, Response, NextFunction } from "express";
import { storageAdapter } from "@/adapters";
import { fileRepo, partRepo } from "@/repositories";

export async function upload(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const partExists = (await partRepo.getPartCount(id)) > 0;

    if (!partExists) {
      res.status(404).json({ error: `Part ${id} not found` });
      return;
    }

    const uploadUrl = await storageAdapter.getUploadUrl({ key: id });

    if (!uploadUrl) {
      res
        .status(404)
        .json({ error: `Failed to get upload URL for file ${id}` });
      return;
    }

    const fileType = "STEP";
    fileRepo.createOrUpdateFile({ type: fileType, partId: id });

    res.json({ uploadUrl });
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

    const partExists = (await partRepo.getPartCount(id)) > 0;

    if (!partExists) {
      res.status(404).json({ error: `Part ${id} not found` });
      return;
    }

    const downloadUrl = await storageAdapter.getDownloadUrl({ key: id });

    if (!downloadUrl) {
      res
        .status(404)
        .json({ error: `Failed to get download URL for file ${id}` });
      return;
    }

    res.json({ downloadUrl });
  } catch (err) {
    next(err);
  }
}
