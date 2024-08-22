"use client";

import { useContext } from "react";
import { CompetitionCategoryDetail as CompetitionCategoryDetailCtx } from "./contexts";
import CompetitionCategoryDetailComponent from "./_components/competition-category-detail-component";

export default function CompetitionCategoryDetail() {
  const context = useContext(CompetitionCategoryDetailCtx);

  return <CompetitionCategoryDetailComponent {...context!} />;
}
