import { prisma } from "../database/client.js";
import type { PartProperties } from "../generated/prisma/client.js";

export function getAllParts() {
  return prisma.partDefinition.findMany();
}

export function getPartById(id: string) {
  return prisma.partDefinition.findUnique({ where: { id } });
}

export function createPart(data: { id: string; name: string }) {
  return prisma.partDefinition.create({ data });
}

export async function updatePartProperties(data: {
  properties: PartProperties;
}) {
  return prisma.partProperties.create({ data: data.properties });
}
