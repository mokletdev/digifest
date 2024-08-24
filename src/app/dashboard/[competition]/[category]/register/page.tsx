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
import { findRegistrations } from "@/database/registration.query";

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

  const registrations = await findRegistrations();
  const registrationPaymentCodes = registrations.map(
    (registration) => registration.paymentCode,
  );
  const uniquePaymentCode =
    (registrationPaymentCodes.length > 0
      ? Math.max(...registrationPaymentCodes)
      : 0) + 1;

  return (
    <Wrapper value={{ competition, category }}>
      <main className="flex w-screen flex-col items-center justify-center px-5 py-12">
        <TeamRegistrationForm
          registrationBatch={activeBatch}
          paymentCode={uniquePaymentCode}
        />
      </main>
    </Wrapper>
  );
}
