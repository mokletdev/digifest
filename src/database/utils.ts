import prisma from "@/lib/prisma";
import { revalidatePath } from "@/utils/revalidate";
import { getCurrentDateByTimeZone } from "@/utils/utils";
import {
  competition,
  competition_category,
  payment_code,
} from "@prisma/client";
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

export async function getPaymentCode() {
  let paymentCode: payment_code;

  const reusablePaymentCode = await prisma.payment_code.findFirst({
    where: { expiredAt: { lte: new Date() }, teamId: null },
    orderBy: { expiredAt: "asc" },
  });

  if (reusablePaymentCode) {
    const expiredAt = new Date(Date.now() + 5 * 60_000);

    paymentCode = await prisma.payment_code.update({
      where: { paymentCode: reusablePaymentCode.paymentCode },
      data: { expiredAt },
    });
  } else {
    const latestPaymentCodeResult = await prisma.$queryRaw<
      { paymentCode: number | null }[]
    >`
      SELECT MAX(paymentCode) as paymentCode FROM PaymentCode;
    `;

    let latestPaymentCode = latestPaymentCodeResult[0]?.paymentCode;

    if (latestPaymentCode === null) {
      const registrationPaymentCode = await prisma.$queryRaw<
        { paymentCode: number | null }[]
      >`
        SELECT MAX(paymentCode) as paymentCode FROM Registration;
      `;
      latestPaymentCode = registrationPaymentCode[0]?.paymentCode ?? 0;
    }

    const expiredAt = new Date(Date.now() + 5 * 60_000);

    paymentCode = await prisma.payment_code.create({
      data: { paymentCode: latestPaymentCode + 1, expiredAt },
    });
  }

  revalidatePath("/dashboard/[competition]/[category]/register");

  return paymentCode;
}
