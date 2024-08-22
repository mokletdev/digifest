import { findActiveRegistrationBatch } from "@/database/utils";
import { getServerSession } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { urlefy } from "@/utils/utils";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import TeamRegistrationForm from "./_components/form";
import { useContext } from "react";
import { CompetitionCategoryDetail } from "../contexts";
import RegisterTeamComponent from "./_components/register-team-component";

export const metadata: Metadata = {
  title: "Pendaftaran Tim",
};

export default async function RegisterTeam() {
  const context = useContext(CompetitionCategoryDetail);

  return <RegisterTeamComponent {...context!} />;
}
