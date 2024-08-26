"use client";

import { competitionWithCategoriesAndBatchesAndStages } from "@/types/relation";
import { createContext } from "react";

export interface LandingPageContextValues {
  competitions: competitionWithCategoriesAndBatchesAndStages[];
}

export const LandingPageContext = createContext<
  LandingPageContextValues | undefined
>(undefined);
