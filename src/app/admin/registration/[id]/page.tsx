import { H2, P } from "@/app/_components/global/text";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import DetailRegistration from "../_components/detail-registration";

export default async function Registration({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const registration = await prisma.registered_team.findUnique({
    where: { id: params.id },
    include: {
      registrationBatch: {
        include: { competitionCategory: true },
      },
      newPaymentCode: true,
      teamMembers: true,
    },
  });

  if (!registration) return notFound();

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <H2 className="font-semibold">Registration Detail</H2>
          <P>Manage Registration Detail Data</P>
        </div>
      </div>
      <DetailRegistration data={registration} />
    </div>
  );
}
