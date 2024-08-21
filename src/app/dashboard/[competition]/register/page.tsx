import {
  findCategoryByDynamicParam,
  findCompetitionByDynamicParam,
} from "@/database/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TeamRegistrationForm from "./_components/form";
import Wrapper from "./_components/wrapper";

export const metadata: Metadata = {
  title: "Pendaftaran Tim",
};

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
    <Wrapper value={{ competition, category, registrationBatchId }}>
      <main className="flex w-screen flex-col items-center justify-center px-5 py-12">
        <TeamRegistrationForm />
      </main>
    </Wrapper>
  );
}
