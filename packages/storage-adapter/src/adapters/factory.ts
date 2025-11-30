import { FileStorage } from "@/types";
import { S3Storage, LocalStorage } from ".";

export function createFileStorage(kind: "s3" | "local"): FileStorage {
  switch (kind) {
    case "s3":
      return new S3Storage();
    case "local":
      return new LocalStorage();
    default: {
      throw new Error(`Unsupported storage backend: ${kind}`);
    }
  }
}
