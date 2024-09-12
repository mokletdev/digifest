import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findCompetitions(
  filter?: Prisma.competitionWhereInput,
  include?: Prisma.competitionInclude,
) {
  const competitions = await prisma.competition.findMany({
    where: filter,
    include,
  });
  return competitions;
}

export async function findCompetition(
  filter: Prisma.competitionWhereUniqueInput,
) {
  const competition = await prisma.competition.findUnique({ where: filter });
  return competition;
}

export async function createCompetition(data: Prisma.competitionCreateInput) {
  const createdCompetition = await prisma.competition.create({ data });
  return createdCompetition;
}

export async function updateCompetition(
  filter: Prisma.competitionWhereUniqueInput,
  data: Prisma.competitionUpdateInput,
) {
  const updatedCompetition = await prisma.competition.update({
    where: filter,
    data,
  });
  return updatedCompetition;
}

export async function removeCompetition(
  filter: Prisma.competitionWhereUniqueInput,
) {
  const deletedCompetition = await prisma.competition.delete({ where: filter });
  return deletedCompetition;
}
