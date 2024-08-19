import { Prisma } from "@prisma/client";

export type competitionCategoryWithCompetition =
  Prisma.competition_categoryGetPayload<{ include: { competition: true } }>;

export type stageWithCompetitionCategory = Prisma.stageGetPayload<{
  include: { competitionCategory: true };
}>;
