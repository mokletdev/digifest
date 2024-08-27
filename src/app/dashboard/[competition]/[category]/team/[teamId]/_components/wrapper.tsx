"use client";

import { ReactNode } from "react";
import {
  CompetitionCategoryDetail,
  CompetitionCategoryDetailValues,
} from "../contexts";

export default function Wrapper({
  children,
  value,
}: {
  children: ReactNode;
  value: CompetitionCategoryDetailValues;
}) {
  return (
    <CompetitionCategoryDetail.Provider value={value}>
      {children}
    </CompetitionCategoryDetail.Provider>
  );
}
