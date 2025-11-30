import { FileType } from "@/generated/prisma/enums";
import { prisma } from "@/database/client";

export function createOrUpdateFile(data: {
  type: FileType;
  partId: string;
  sizeBytes?: number;
}) {
  return prisma.file.upsert({
    where: { partId: data.partId },
    update: data,
    create: data
  });
}
