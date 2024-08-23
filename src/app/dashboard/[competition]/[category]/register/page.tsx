import {
  findActiveRegistrationBatch,
  findCategoryByDynamicParam,
  findCompetitionByDynamicParam,
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
  const session = await getServerSession();

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    include: {
      registrations: {
        select: {
          registrationBatch: {
            include: { competitionCategory: { select: { id: true } } },
          },
        },
      },
    },
  });

  const { category, competition } = await provideCompetitionAndCategory(
    competitionName,
    categoryName,
  );

  const alreadyRegistered = user?.registrations.find(
    (registration) =>
      registration.registrationBatch.competitionCategory.id === category.id,
  );
  if (alreadyRegistered)
    return redirect(
      `/dashboard/${urlefy(competition.name)}/${urlefy(category.name)}`,
    );

  const activeBatch = await findActiveRegistrationBatch(category.id);
  if (!activeBatch) return notFound();

  return (
    <Wrapper value={{ competition, category }}>
      <main className="flex w-screen flex-col items-center justify-center px-5 py-12">
        <TeamRegistrationForm />
      </main>
    </Wrapper>
  );
}
