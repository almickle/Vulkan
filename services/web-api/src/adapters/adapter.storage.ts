import { createFileStorage } from "@vulkan/storage-adapter";

const storageBackendType = process.env.STORAGE_BACKEND_TYPE as "s3" | "local";

export const storageAdapter = createFileStorage(storageBackendType);
