import { prisma } from "../database/client.js";

export function getAllUsers() {
  return prisma.user.findMany();
}

export function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export function createUser(data: { email: string; name?: string }) {
  return prisma.user.create({ data });
}

export function createDummyUser() {
  console.log("Created dummy user");
  prisma.user.create({
    data: {
      id: "1",
      name: "Alice",
      email: "alice@prisma.io",
      createdAt: new Date()
    }
  });
}
