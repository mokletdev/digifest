"use client";
import { registrationWithMembers } from "@/types/relation";
import { competition, competition_category, team_member } from "@prisma/client";
import { createContext } from "react";

export interface RegistrationFormContextValues {
  competition: competition;
  category: competition_category;
  member?: team_member;
  registration: registrationWithMembers;
}

export const RegistrationFormContext = createContext<
  RegistrationFormContextValues | undefined
>(undefined);
