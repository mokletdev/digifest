import {
  findCategoryByDynamicParam,
  findCompetitionByDynamicParam,
} from "@/database/utils";
import { notFound } from "next/navigation";
import TeamRegistrationForm from "./_components/form";

export default async function RegisterTeam({
  params,
  searchParams,
}: {
  params: { competition: string };
  searchParams: { category: string; registrationBatchId: string };
}) {
  const { competition: selectedCompetition } = params;
  const { category: selectedCategory, registrationBatchId } = searchParams;

  const competition = await findCompetitionByDynamicParam(selectedCompetition);
  if (!competition) return notFound();

  const category = await findCategoryByDynamicParam(
    competition.id,
    selectedCategory,
  );
  if (!category) return notFound();

  return (
    <main className="flex w-screen items-center justify-center px-5 py-12">
      <TeamRegistrationForm
        competitionName={competition.name}
        categoryName={category.name}
      />
    </main>
  );
}
