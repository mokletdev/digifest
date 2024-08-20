import { Prisma } from "@prisma/client";

export type competitionCategoryWithCompetition =
  Prisma.competition_categoryGetPayload<{ include: { competition: true } }>;

export type competitionWithCategoriesAndBatchesAndStages =
  Prisma.competitionGetPayload<{
    include: {
      competitionCategories: {
        include: { registrationBatches: true; stages: true };
      };
    };
  }>;
