import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findRegistrationBatches(
  filter?: Prisma.registration_batchWhereInput,
) {
  const registrationBatches = await prisma.registration_batch.findMany({
    where: filter,
    include: { competitionCategory: true },
  });
  return registrationBatches;
}

export async function findRegistrationBatch(
  filter: Prisma.registration_batchWhereUniqueInput,
) {
  const registrationBatch = await prisma.registration_batch.findUnique({
    where: filter,
  });
  return registrationBatch;
}

export async function createRegistrationBatch(
  data: Prisma.registration_batchCreateInput,
) {
  const createdRegistrationBatch = await prisma.registration_batch.create({
    data,
  });
  return createdRegistrationBatch;
}

export async function updateRegistrationBatch(
  filter: Prisma.registration_batchWhereUniqueInput,
  data: Prisma.registration_batchUpdateInput,
) {
  const updatedRegistrationBatch = await prisma.registration_batch.update({
    where: filter,
    data,
  });
  return updatedRegistrationBatch;
}

export async function removeRegistrationBatch(
  filter: Prisma.registration_batchWhereUniqueInput,
) {
  const deletedRegistrationBatch = await prisma.registration_batch.delete({
    where: filter,
  });
  return deletedRegistrationBatch;
}
