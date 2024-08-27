"use client";
import { competition, competition_category } from "@prisma/client";
import { createContext } from "react";

export interface CompetitionCategoryDetailValues {
  competition: competition;
  category: competition_category;
}

export const CompetitionCategoryDetail = createContext<
  CompetitionCategoryDetailValues | undefined
>(undefined);
