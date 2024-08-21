import prisma from "@/lib/prisma";
import { competition, competition_category } from "@prisma/client";

export async function findCompetitionByDynamicParam(param: string) {
  const extractedCompetitionName = param.replaceAll("_", " ");
  // Try finding the competitions
  const competitions = (await prisma.$queryRaw`
    SELECT * FROM competition WHERE LOWER(name) LIKE LOWER(${extractedCompetitionName});
    `) as competition[];
  // We only want the first index
  const competition = competitions[0] as competition | undefined;

  return competition;
}

export async function findCategoryByDynamicParam(
  competitionId: string,
  param: string,
) {
  const extractedCategoryName = param.replaceAll("_", " ");
  // Try finding the competitions
  const categories = (await prisma.$queryRaw`
    SELECT * FROM competitioncategory WHERE LOWER(name) LIKE LOWER(${extractedCategoryName}) AND competitionId=${competitionId};
    `) as competition_category[];
  // We only want the first index
  const category = categories[0] as competition_category | undefined;

  return category;
}
