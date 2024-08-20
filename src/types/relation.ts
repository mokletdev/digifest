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

export type stageWithCompetitionCategory = Prisma.stageGetPayload<{
  include: { competitionCategory: true };
}>;

export type announcementWithStage = Prisma.announcementGetPayload<{
  include: { stage: true };
}>;
