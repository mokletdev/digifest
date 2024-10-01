import {
  findActiveRegistrationBatch,
  findCategoryByDynamicParam,
  findCompetitionByDynamicParam,
} from "@/database/utils";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import Wrapper from "./_components/wrapper";
import { getServerSession } from "@/lib/next-auth";
import prisma from "@/lib/prisma";

export default async function CompetitionCategoryDetailLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { competition: string; category: string };
}) {
  const { category: selectedCategory, competition: selectedCompetition } =
    params;
  const session = await getServerSession();

  const competition = await findCompetitionByDynamicParam(selectedCompetition);
  if (!competition) return notFound();

  const category = await findCategoryByDynamicParam(
    competition.id,
    selectedCategory,
  );
  if (!category) return notFound();

  const activeBatch = await findActiveRegistrationBatch(category.id);
  const registeredTeams = await prisma.registered_team.findMany({
    where: {
      userId: session?.user?.id,
      registrationBatch: { competitionCategoryId: category.id },
    },
  });
  if (!activeBatch && registeredTeams.length === 0) return notFound();

  return <Wrapper value={{ category, competition }}>{children}</Wrapper>;
}
