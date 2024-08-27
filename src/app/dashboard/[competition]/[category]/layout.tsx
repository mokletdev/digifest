import {
  findCategoryByDynamicParam,
  findCompetitionByDynamicParam,
} from "@/database/utils";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import Wrapper from "./_components/wrapper";

export default async function CompetitionCategoryDetailLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { competition: string; category: string };
}) {
  const { category: selectedCategory, competition: selectedCompetition } =
    params;

  const competition = await findCompetitionByDynamicParam(selectedCompetition);
  if (!competition) return notFound();

  const category = await findCategoryByDynamicParam(
    competition.id,
    selectedCategory,
  );
  if (!category) return notFound();

  return <Wrapper value={{ category, competition }}>{children}</Wrapper>;
}
