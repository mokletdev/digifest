"use client";
import {
  competitionWithCategoriesAndBatchesAndStages,
  registrationWithBatch,
} from "@/types/relation";
import { createContext } from "react";

export interface DashboardContextValues {
  registrations: registrationWithBatch[];
  competitions: competitionWithCategoriesAndBatchesAndStages[];
}

export const DashboardContext = createContext<
  DashboardContextValues | undefined
>(undefined);
