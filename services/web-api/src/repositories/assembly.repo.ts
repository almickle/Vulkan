import { prisma } from "../database/client.js";

export function getAllUsers() {
  return prisma.user.findMany();
}

export function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export function createUser(data: { id: string; name: string; email: string }) {
  return prisma.user.create({ data });
}

export function updateUser(
  id: string,
  data: { email?: string; name?: string }
) {
  return prisma.user.update({ where: { id }, data });
}
