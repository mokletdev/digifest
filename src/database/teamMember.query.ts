import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findMembers(filter?: Prisma.team_memberWhereInput) {
  const members = await prisma.team_member.findMany({
    where: filter,
  });
  return members;
}

export async function findMember(filter: Prisma.team_memberWhereUniqueInput) {
  const member = await prisma.team_member.findUnique({
    where: filter,
  });
  return member;
}

export async function createMember(data: Prisma.team_memberCreateInput) {
  const createdMember = await prisma.team_member.create({
    data,
  });
  return createdMember;
}

export async function updateMember(
  filter: Prisma.team_memberWhereUniqueInput,
  data: Prisma.team_memberUpdateInput,
) {
  const updatedMember = await prisma.team_member.update({
    where: filter,
    data,
  });
  return updatedMember;
}

export async function removeMember(filter: Prisma.team_memberWhereUniqueInput) {
  const deletedMember = await prisma.team_member.delete({
    where: filter,
  });
  return deletedMember;
}
