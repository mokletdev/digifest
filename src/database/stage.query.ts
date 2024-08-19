import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findStages(filter?: Prisma.stageWhereInput) {
  const stages = await prisma.stage.findMany({
    where: filter,
    include: { competitionCategory: true },
  });
  return stages;
}

export async function findStage(filter: Prisma.stageWhereUniqueInput) {
  const stage = await prisma.stage.findUnique({
    where: filter,
  });
  return stage;
}

export async function createStage(data: Prisma.stageCreateInput) {
  const createdStage = await prisma.stage.create({ data });
  return createdStage;
}

export async function updateStage(
  filter: Prisma.stageWhereUniqueInput,
  data: Prisma.stageUpdateInput,
) {
  const updatedStage = await prisma.stage.update({
    where: filter,
    data,
  });
  return updatedStage;
}

export async function removeStage(filter: Prisma.stageWhereUniqueInput) {
  const deletedStage = await prisma.stage.delete({
    where: filter,
  });
  return deletedStage;
}
