import prisma from "@/lib/prisma";
import { getCurrentDateByTimeZone } from "@/utils/utils";
import { competition, competition_category } from "@prisma/client";
import { notFound } from "next/navigation";

export async function findCompetitionByDynamicParam(param: string) {
  const extractedCompetitionName = param.replaceAll("_", " ");
  // Try finding the competitions
  const competitions = await prisma.$queryRaw<competition[]>`
    SELECT * FROM Competition WHERE LOWER(name) LIKE LOWER(${extractedCompetitionName});
    `;
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
  const categories = await prisma.$queryRaw<competition_category[]>`
    SELECT * FROM CompetitionCategory WHERE LOWER(name) LIKE LOWER(${extractedCategoryName}) AND competitionId=${competitionId};
    `;
  // We only want the first index
  const category = categories[0] as competition_category | undefined;

  return category;
}

export async function findActiveRegistrationBatch(categoryId: string) {
  const category = await prisma.competition_category.findUnique({
    where: { id: categoryId },
    include: {
      registrationBatches: {
        where: {
          openedDate: { lte: getCurrentDateByTimeZone() },
          closedDate: { gte: getCurrentDateByTimeZone() },
        },
      },
    },
  });

  const batch = category?.registrationBatches[0];

  return batch;
}

export async function findActiveStage(categoryId: string) {
  const category = await prisma.competition_category.findUnique({
    where: { id: categoryId },
    include: {
      stages: {
        where: {
          startDate: { lte: getCurrentDateByTimeZone() },
          endDate: { gte: getCurrentDateByTimeZone() },
          isCompetitionStage: true,
        },
        include: { teams: true },
      },
    },
  });

  const stage = category?.stages[0];

  return stage;
}

export async function provideCompetitionAndCategory(
  competitionName: string,
  categoryName: string,
) {
  const competition = await findCompetitionByDynamicParam(competitionName);
  if (!competition) return notFound();

  const category = await findCategoryByDynamicParam(
    competition.id,
    categoryName,
  );
  if (!category) return notFound();

  return { competition, category };
}
