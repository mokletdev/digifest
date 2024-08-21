"use client";

import { useZodForm } from "@/app/hooks/useZodForm";
import {
  createRegisteredTeamFormSchema,
  createTeamMemberFormSchema,
} from "@/lib/validator";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import {
  RegistrationFormContext,
  RegistrationFormContextValues,
} from "../contexts";
import { TeamDataForm, TeamMemberForm } from "./form-parts";

export default function TeamRegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const router = useRouter();

  const registrationContext = useContext(RegistrationFormContext);
  const { category } = registrationContext as RegistrationFormContextValues;

  const teamRegistrationForm = useZodForm({
    schema: createRegisteredTeamFormSchema,
  });
  const memberForms = Array.from({ length: category.maxMemberCount }, (_, i) =>
    useZodForm({ schema: createTeamMemberFormSchema }),
  );

  const teamRegistrationOnSubmit = teamRegistrationForm.handleSubmit(({}) => {
    setFormStep(1);
  });
  const teamMemberOnSubmit = teamRegistrationForm.handleSubmit(({}) => {
    setFormStep(2);
  });

  return [
    <TeamDataForm
      onSubmit={teamRegistrationOnSubmit}
      teamRegistrationForm={teamRegistrationForm}
    />,
    <TeamMemberForm onSubmit={teamMemberOnSubmit} memberForms={memberForms} />,
  ][formStep];
}
