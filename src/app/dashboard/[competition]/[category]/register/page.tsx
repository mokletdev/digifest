import {
  findActiveRegistrationBatch,
  provideCompetitionAndCategory,
} from "@/database/utils";
import { getServerSession } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { urlefy } from "@/utils/utils";
import { notFound, redirect } from "next/navigation";
import TeamRegistrationForm from "./_components/form";
import Wrapper from "./_components/wrapper";

export default async function RegisterTeam({
  params,
}: {
  params: { competition: string; category: string };
}) {
  const { category: categoryName, competition: competitionName } = params;

  const { category, competition } = await provideCompetitionAndCategory(
    competitionName,
    categoryName,
  );

  const activeBatch = await findActiveRegistrationBatch(category.id);
  if (!activeBatch) return notFound();

  return (
    <Wrapper value={{ competition, category }}>
      <main className="flex w-screen flex-col items-center justify-center px-5 py-12">
        <TeamRegistrationForm registrationBatch={activeBatch} />
      </main>
    </Wrapper>
  );
}
