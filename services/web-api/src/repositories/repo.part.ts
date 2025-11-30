import { prisma } from "@/database/client";
import type { PartProperties } from "@/generated/prisma/client";

export function getAllParts() {
  return prisma.partDefinition.findMany();
}

export function getPartById(id: string) {
  return prisma.partDefinition.findUnique({ where: { id } });
}

export function getPartCount(id: string) {
  return prisma.partDefinition.count({ where: { id } });
}

export function createPart(data: { id: string; name: string }) {
  return prisma.partDefinition.create({ data });
}

export async function updatePartProperties(data: {
  properties: PartProperties;
}) {
  return prisma.partProperties.upsert({
    where: { partId: data.properties.partId },
    update: data.properties,
    create: data.properties
  });
}
