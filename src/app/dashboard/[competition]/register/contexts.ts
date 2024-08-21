"use client";
import { competition, competition_category } from "@prisma/client";
import { createContext } from "react";

export interface RegistrationFormContextValues {
  competition: competition;
  category: competition_category;
  registrationBatchId: string;
}

export const RegistrationFormContext = createContext<
  RegistrationFormContextValues | undefined
>(undefined);
