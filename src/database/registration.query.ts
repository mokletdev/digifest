import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findRegistrations(
  filter?: Prisma.registered_teamWhereInput,
) {
  const registrations = await prisma.registered_team.findMany({
    where: filter,
    include: { registrationBatch: true },
  });
  return registrations;
}

export async function findRegistration(
  filter: Prisma.registered_teamWhereUniqueInput,
  include?: Prisma.registered_teamInclude,
) {
  const registrationBatch = await prisma.registered_team.findUnique({
    where: filter,
    include,
  });
  return registrationBatch;
}

export async function createRegistration(
  data: Prisma.registered_teamCreateInput,
) {
  const createdRegistration = await prisma.registered_team.create({
    data,
  });
  return createdRegistration;
}

export async function updateRegistration(
  filter: Prisma.registered_teamWhereUniqueInput,
  data: Prisma.registered_teamUpdateInput,
) {
  const updatedRegistration = await prisma.registered_team.update({
    where: filter,
    data,
  });
  return updatedRegistration;
}

export async function removeRegistration(
  filter: Prisma.registered_teamWhereUniqueInput,
) {
  const deletedRegistration = await prisma.registered_team.delete({
    where: filter,
  });
  return deletedRegistration;
}
