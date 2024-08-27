import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findUsers(filter?: Prisma.userWhereInput) {
  const users = await prisma.user.findMany({ where: filter });
  return users;
}

export async function findUser(filter: Prisma.userWhereUniqueInput) {
  const user = await prisma.user.findUnique({ where: filter });
  return user;
}

export async function createUser(data: Prisma.userCreateInput) {
  const createdUser = await prisma.user.create({ data });
  return createdUser;
}

export async function updateUser(
  filter: Prisma.userWhereUniqueInput,
  data: Prisma.userUpdateInput,
) {
  const updatedUser = await prisma.user.update({ where: filter, data });
  return updatedUser;
}

export async function removeUser(filter: Prisma.userWhereUniqueInput) {
  const deletedUser = await prisma.user.delete({ where: filter });
  return deletedUser;
}
