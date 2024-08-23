import { findMember } from "@/database/teamMember.query";
import {
  findActiveRegistrationBatch,
  provideCompetitionAndCategory,
} from "@/database/utils";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import MemberRegistrationForm from "./_components/form";
import Wrapper from "./_components/wrapper";
import { getServerSession } from "@/lib/next-auth";

export const metadata: Metadata = {
  title: "Pendaftaran Member",
};

export default async function RegisterTeam({
  params,
  searchParams,
}: {
  params: { competition: string; category: string };
  searchParams: { id?: string; registrationId: string };
}) {
  const session = await getServerSession();
  const { competition: competitionName, category: categoryName } = params;

  const { category, competition } = await provideCompetitionAndCategory(
    competitionName,
    categoryName,
  );

  const activeBatch = await findActiveRegistrationBatch(category.id);
  if (!activeBatch) return notFound();

  const { id: memberId, registrationId } = searchParams;

  if (!registrationId) return notFound();

  const member = memberId ? await findMember({ id: memberId }) : undefined;
  const registration = await prisma.registered_team.findUnique({
    where: { id: registrationId },
    include: { teamMembers: true },
  });

  if (!registration || registration.userId !== session?.user?.id)
    return notFound();

  return (
    <Wrapper
      value={{
        category,
        competition,
        member: member ?? undefined,
        registration,
      }}
    >
      <main className="flex w-screen flex-col items-center justify-center px-5 py-12">
        <MemberRegistrationForm />
      </main>
    </Wrapper>
  );
}
