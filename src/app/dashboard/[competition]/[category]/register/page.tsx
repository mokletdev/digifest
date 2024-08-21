import {
  findActiveRegistrationBatch,
  findCategoryByDynamicParam,
  findCompetitionByDynamicParam,
} from "@/database/utils";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import TeamRegistrationForm from "./_components/form";
import Wrapper from "./_components/wrapper";
import { findUser } from "@/database/user.query";
import { getServerSession } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { urlefy } from "@/utils/utils";

export const metadata: Metadata = {
  title: "Pendaftaran Tim",
};

export default async function RegisterTeam({
  params,
}: {
  params: { competition: string; category: string };
}) {
  const session = await getServerSession();
  const { competition: selectedCompetition, category: selectedCategory } =
    params;

  const competition = await findCompetitionByDynamicParam(selectedCompetition);
  if (!competition) return notFound();

  const category = await findCategoryByDynamicParam(
    competition.id,
    selectedCategory,
  );
  if (!category) return notFound();

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    include: {
      registrations: {
        select: {
          registrationBatch: {
            include: { competitionCategory: { select: { name: true } } },
          },
        },
      },
    },
  });
  const checkCategory = user?.registrations.find(
    (registration) =>
      registration.registrationBatch.competitionCategory.name === category.name,
  );
  if (checkCategory)
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
