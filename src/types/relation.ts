import { Prisma } from "@prisma/client";

export type competitionCategoryWithCompetition =
  Prisma.competition_categoryGetPayload<{
    include: { competition: true; _count: { select: { stages: true } } };
  }>;

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

export type stageWithTeam = Prisma.stageGetPayload<{
  include: { teams: true; competitionCategory: { select: { name: true } } };
}>;

export type registrationBatchWithCompetitionCategory =
  Prisma.registration_batchGetPayload<{
    include: { competitionCategory: true };
  }>;

export type registrationBatchWithCompetitionCategoryAndRegistrants =
  Prisma.registration_batchGetPayload<{
    include: {
      competitionCategory: true;
      registrations: { select: { status: true } };
    };
  }>;

export type announcementWithStage = Prisma.announcementGetPayload<{
  include: { stage: true };
}>;

export type registrationWithBatch = Prisma.registered_teamGetPayload<{
  include: {
    registrationBatch: {
      select: {
        batchName: true;
        competitionCategory: { select: { name: true; competition: true } };
      };
    };
  };
}>;

export type registrationCompleteData = Prisma.registered_teamGetPayload<{
  include: {
    registrationBatch: {
      include: { competitionCategory: true };
    };
    teamMembers: true;
  };
}>;
