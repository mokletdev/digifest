import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findCompetitions(filter?: Prisma.competitionWhereInput) {
  const Competitions = await prisma.competition.findMany({ where: filter });
  return Competitions;
}

export async function findCompetition(filter: Prisma.competitionWhereUniqueInput) {
  const Competition = await prisma.competition.findUnique({ where: filter });
  return Competition;
}

export async function createCompetition(data: Prisma.competitionCreateInput) {
  const createdCompetition = await prisma.competition.create({ data });
  return createdCompetition;
}

export async function updateCompetition(
  filter: Prisma.competitionWhereUniqueInput,
  data: Prisma.competitionUpdateInput
) {
  const updatedCompetition = await prisma.competition.update({ where: filter, data });
  return updatedCompetition;
}

export async function removeCompetition(filter: Prisma.competitionWhereUniqueInput) {
  const deletedCompetition = await prisma.competition.delete({ where: filter });
  return deletedCompetition;
}
