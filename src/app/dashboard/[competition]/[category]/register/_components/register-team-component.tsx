import { findActiveRegistrationBatch } from "@/database/utils";
import { getServerSession } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { urlefy } from "@/utils/utils";
import { notFound, redirect } from "next/navigation";
import { CompetitionCategoryDetailValues } from "../../contexts";
import TeamRegistrationForm from "./form";

export default async function RegisterTeamComponent({
  competition,
  category,
}: CompetitionCategoryDetailValues) {
  const session = await getServerSession();

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
    <main className="flex w-screen flex-col items-center justify-center px-5 py-12">
      <TeamRegistrationForm />
    </main>
  );
}
